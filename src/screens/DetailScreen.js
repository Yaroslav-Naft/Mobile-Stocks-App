import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


const DetailScreen = ({ route }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()

  async function fetchData() {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${route.params['1. symbol']}&apikey=WAD33GWL180QLM8L`);
    res
      .json()
      .then(res => setStock(res['Global Quote']))
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
              <TouchableOpacity style={styles.buyBtn}>
                <Text style={styles.buy}> BUY </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sellBtn}>
                <Text style={styles.sell}> SELL </Text>
              </TouchableOpacity>
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
  }
})




export default DetailScreen;