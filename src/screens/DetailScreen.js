import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { firebase } from "../firebase/config"

const DetailScreen = ({ route }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()

  async function fetchData() {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${route.params["1. symbol"]}&apikey=WAD33GWL180QLM8L`
    )
    res
      .json()
      .then((res) => setStock(res["Global Quote"]))
      .catch((err) => setErrors(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const buy = async () => {
    // create new stock object
    const userId = "aDffMO8d3NMkr8MPkQr24SCIAnt2"
    const stockId = userId + stock["01. symbol"]
    const sharesBought = 100

    try {
      const stockRef = firebase.firestore().collection("stocks")
      const doc = await stockRef.doc(stockId).get()

      const portfolioRef = firebase.firestore().collection("portfolio")
      const portfolioDoc = await portfolioRef.doc(userId).get()
      const portfolioData = portfolioDoc.data()
      const userCash = portfolioData.cash
      const updatedUserCash = userCash - sharesBought * stock["05. price"]

      if (doc.exists) {
        // get the numShares and the avgPrice
        const docData = doc.data()
        const prevNumShares = docData.numShares
        const updatedNumShares = prevNumShares + sharesBought

        const prevAvgPrice = docData.avgPrice
        const updatedAvgPrice =
          (prevNumShares * prevAvgPrice + sharesBought * stock["05. price"]) /
          updatedNumShares

        await stockRef.doc(stockId).update({
          numShares: updatedNumShares,
          avgPrice: updatedAvgPrice,
        })

        await portfolioRef.doc(userId).update({
          cash: updatedUserCash,
        })
        return
      }

      const boughtStock = {
        id: stockId,
        userId: userId,
        symbol: stock["01. symbol"],
        numShares: sharesBought,
        avgPrice: (sharesBought * stock["05. price"]) / sharesBought,
      }

      await portfolioRef.doc(userId).update({
        stocks: firebase.firestore.FieldValue.arrayUnion(stockId),
        cash: updatedUserCash,
      })

      await stockRef.doc(stockId).set(boughtStock)
    } catch (e) {
      alert(e)
    }
  }

  const sell = async () => {
    const userId = "aDffMO8d3NMkr8MPkQr24SCIAnt2"
    const stockId = userId + stock["01. symbol"]
    const stockRef = firebase.firestore().collection("stocks")

    const shareSold = 50

    const portfolioRef = firebase.firestore().collection("portfolio")
    const portfolioDoc = await portfolioRef.doc(userId).get()
    const portfolioData = portfolioDoc.data()
    const userCash = portfolioData.cash
    const updatedUserCash = userCash + shareSold * stock["05. price"]

    try {
      const doc = await stockRef.doc(stockId).get()
      const docData = doc.data()
      const prevNumShares = docData.numShares
      const updatedNumShares = prevNumShares - shareSold

      if (updatedNumShares < 0) {
        // delete the entry from stocks collection and from portfolio
        try {
          await stockRef.doc(stockId).delete()
          await portfolioRef.doc(userId).update({
            stocks: firebase.firestore.FieldValue.arrayRemove(stockId),
          })
        } catch (e) {
          alert(e)
        }
        return
      }

      const prevAvgPrice = docData.avgPrice
      const updatedAvgPrice =
        (prevNumShares * prevAvgPrice - stock["05. price"]) / updatedNumShares

      await stockRef.doc(stockId).update({
        numShares: updatedNumShares,
        avgPrice: updatedAvgPrice,
      })

      await portfolioRef.doc(userId).update({
        cash: updatedUserCash,
      })
    } catch (e) {
      alert(e)
    }
  }

  return (
    <View>
      {stock ? (
        <View>
          {/* {console.log(stock)} */}
          <Text>{stock["01. symbol"]}</Text>
          <Text>{Number(stock["05. price"]).toFixed(2)}</Text>
          <View>
            <TouchableOpacity onPress={() => buy()} style={styles.buyBtn}>
              <Text style={styles.buy}> BUY </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => sell()} style={styles.sellBtn}>
              <Text style={styles.sell}> SELL </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buyBtn: {
    backgroundColor: "#457B9D",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 50,
  },
  buy: {
    color: "white",
    fontSize: 25,
    fontWeight: "800",
  },

  sellBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#457B9D",
    borderStyle: "solid",
    borderWidth: 5,
    width: 200,
    height: 50,
    borderRadius: 30,
  },
  sell: {
    color: "#457B9D",
    fontSize: 25,
    fontWeight: "800",
  },
})

export default DetailScreen
