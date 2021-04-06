import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { firebase } from "../firebase/config"

const DetailScreen = ({ route, user }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()

  async function fetchData() {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${route.params}&apikey=WAD33GWL180QLM8L`
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
    const userId = user.id
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
    const userId = user.id
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

      if (updatedNumShares <= 0) {
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
        (prevNumShares * prevAvgPrice - shareSold * stock["05. price"]) /
        updatedNumShares

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
    <View style={styles.container}>
      {stock ? (
        <View>
          <View style={styles.round}>
            {/* {console.log(stock)} */}
            <Text style={styles.symbol}>{stock["01. symbol"]}</Text>
            <Text style={styles.info}>
              Price: {Number(stock["05. price"]).toFixed(2)}
            </Text>
            <Text style={styles.info}>
              Open: {Number(stock["02. open"]).toFixed(2)}
            </Text>
            <Text style={styles.info}>
              High: {Number(stock["03. high"]).toFixed(2)}
            </Text>
            <Text style={styles.info}>
              Low: {Number(stock["04. low"]).toFixed(2)}
            </Text>
          </View>
          <View style={styles.btns}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: "auto",
  },
  round: {
    height: 300,
    width: 300,
    backgroundColor: "#457B9D",
    borderRadius: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontSize: 30,
    fontWeight: "800",
    padding: 10,
    color: "white",
  },
  info: {
    fontSize: 20,
    padding: 3,
    color: "white",
  },

  btns: {
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtn: {
    backgroundColor: "#457B9D",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    margin: 30,
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
