import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { firebase } from "../firebase/config"


const DetailScreen = ({ route, user }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()
  const [symbol, setSymbol] = useState("")
  const [quotePrice, setQuotePrice] = useState("")
  const [numShares, setNumShares] = useState()

  const addStock = async () => {
    const stockId = user.id + symbol
  

    try {
     const stockRef = firebase.firestore().collection("stocks")
     const doc = await stockRef.doc(stockId).get()
      const stock = {
        id: stockId,
        userId: user.id,
        symbol: symbol,
        quotePrice: quotePrice,
        numShares: numShares
      }

      //New Stock
      const portfolioRef = firebase.firestore().collection("portfolio")
      await portfolioRef.doc(user.id).update({
        stocks: firebase.firestore.FieldValue.arrayUnion(stockId)
      })
      await stockRef.doc(stockId).set(stock)
      // navigation.navigate("Home", { user: data })
    } catch (e) {
      alert(e)
    }
  }


  async function fetchData() {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${route.params}&apikey=WAD33GWL180QLM8L`);
    res
      .json()
      .then(res => setStock(res['Global Quote']))
      .then( res => setSymbol(stock['01. symbol']))
      .then( res => setQuotePrice(Number(stock['05. price']).toFixed(2)))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
      <View style={styles.container}>
        {
          stock ?
            <View>
              <View style={styles.round}>
                {/* {console.log(stock)} */}
                <Text style={styles.symbol}>{stock['01. symbol']}</Text>
                <Text style={styles.info}>Price:  {Number(stock['05. price']).toFixed(2)}</Text>
                <Text style={styles.info}>Open: {Number(stock['02. open']).toFixed(2)}</Text>
                <Text style={styles.info}>High: {Number(stock['03. high']).toFixed(2)}</Text>
                <Text style={styles.info}>Low:  {Number(stock['04. low']).toFixed(2)}</Text>
              </View>
              <View style={styles.btns}>
              <TextInput
              style={styles.input}
              onChangeText={setNumShares}
              placeholder="Please select share numbers"
              keyboardType="numeric"
              />
                <TouchableOpacity style={styles.buyBtn} onPress={() => addStock()}>
                  <Text style={styles.buy}> BUY </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sellBtn}>
                  <Text style={styles.sell}> SELL </Text>
                </TouchableOpacity>
                {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}

              </View>
            </View>
            :
            <View>
              <Text>Loading...</Text>
            </View>
        }
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: "auto"
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
    color: "white"
  },
  info: {
    fontSize: 20,
    padding: 3,
    color: "white"
  },

  btns: {
    justifyContent: "center",
    alignItems: "center"
  },

  buyBtn: {
    backgroundColor: "#457B9D",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    margin: 30
  },
  buy: {
    color: "white",
    fontSize: 25,
    fontWeight: "800"
  },

  sellBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#457B9D",
    borderStyle: "solid",
    borderWidth: 5,
    width: 200,
    height: 50,
    borderRadius: 30
  },
  sell: {
    color: "#457B9D",
    fontSize: 25,
    fontWeight: "800"
  },
  input: {
    height: 60,
    width: 400,
    backgroundColor: "#D9D9D9",
    margin: 40,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
  },
})




export default DetailScreen;