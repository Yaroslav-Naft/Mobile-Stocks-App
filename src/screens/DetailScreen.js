import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { KeyboardHide } from "../components/misc/KeyboardHide"
import { firebase } from "../firebase/config"


const DetailScreen = ({ route, user }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()
  const [shares, setShares] = useState(0)

  
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

    const userId = user.id
    const stockId = userId + stock["01. symbol"]

    try {
      const stockRef = firebase.firestore().collection("stocks")
      const doc = await stockRef.doc(stockId).get()

      const userRef = firebase.firestore().collection("users")
      const userDoc = await userRef.doc(userId).get()
      const userData = userDoc.data()
      const userCash = userData.cash

      if (shares * stock["05. price"] > userCash) {
        alert("Sorry, can't perform the transaction. Insufficient funds")
        return
      }
      const updatedUserCash = userCash - shares * stock["05. price"]

      if (doc.exists) {
        const docData = doc.data()
        const prevNumShares = docData.numShares
        const updatedNumShares = prevNumShares + shares

        const prevAvgPrice = docData.avgPrice
        const updatedAvgPrice =
          (prevNumShares * prevAvgPrice + shares * stock["05. price"]) /
          updatedNumShares

        await stockRef.doc(stockId).update({
          numShares: updatedNumShares,
          avgPrice: updatedAvgPrice,
        })

        await userRef.doc(userId).update({
          cash: updatedUserCash,
        })
        return
      }

      const boughtStock = {
        id: stockId,
        userId: userId,
        symbol: stock["01. symbol"],
        numShares: shares,
        avgPrice: (shares * stock["05. price"]) / shares,
      }

      await userRef.doc(userId).update({
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

    const shareSold = shares

    try {
      const doc = await stockRef.doc(stockId).get()
      if (!doc.exists) {
        alert(`You don't have any ${stock["01. symbol"]} stocks yet`)
        return
      }
      const docData = doc.data()
      const prevNumShares = docData.numShares

      if (prevNumShares < shareSold) {
        alert(
          `Can't perform transaction. You only have ${prevNumShares} shares.`
        )
        return
      }

      const updatedNumShares = prevNumShares - shareSold

      const userRef = firebase.firestore().collection("users")
      const userDoc = await userRef.doc(userId).get()
      const userData = userDoc.data()
      const userCash = userData.cash
      const updatedUserCash = userCash + shareSold * stock["05. price"]

      if (updatedNumShares <= 0) {
        try {
          await stockRef.doc(stockId).delete()
          await userRef.doc(userId).update({
            cash: updatedUserCash,
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

      await userRef.doc(userId).update({
        cash: updatedUserCash,
      })
    } catch (e) {
      alert(e)
    }
  }

  const toggleWatchlist = async () => {
    const userId = user.id
    const stockId = userId + stock["01. symbol"]
    const stockRef = firebase.firestore().collection("watchLists")
    const doc = await stockRef.doc(stockId).get()
    if (!doc.exists) {
      console.log('stock added')
    try {
      const stockRef = firebase.firestore().collection("watchLists")

      const selectedStock = {
        id: stockId,
        price: stock["05. price"],
        userId: userId,
        symbol: stock["01. symbol"]
      }
      await stockRef.doc(stockId).set(selectedStock)
    } catch (e) {
      alert(e)
    }
  } else {
    try {
      const stockRef = firebase.firestore().collection("watchLists")
      await stockRef.doc(stockId).delete()
    } catch (e) {
      alert(e)
    }
    console.log('stock removed')
  }
    
  }

  return (
    <KeyboardHide>
      <KeyboardAvoidingView
        behavior={"padding"}
        style={styles.container}
      >
        <View style={styles.container}>
          {stock ? (
            <View>
              <View style={styles.round}>
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
              <View>
                <TextInput
                  style={styles.input}
                  value={shares}
                  onChangeText={(e) => setShares(+e)}
                  placeholder="Please select the number of shares"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
              <View style={styles.btns}>
                <TouchableOpacity onPress={() => buy()} style={styles.buyBtn}>
                  <Text style={styles.buy}> BUY </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => sell()} style={styles.sellBtn}>
                  <Text style={styles.sell}> SELL </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleWatchlist()} style={styles.sellBtn}>
                  <Text style={styles.sell}> WatchList </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
              <View>
                <Text>Loading...</Text>
              </View>
            )}
        </View>
      </KeyboardAvoidingView>
    </KeyboardHide>
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

  input: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginLeft: 30,
    fontSize: 16,
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
