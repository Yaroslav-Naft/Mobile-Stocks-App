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
    console.log("test111")
  }, [])

  const test = s => {
    console.log("test")
  }




  return (
    <View>
      {
        stock ?
          <View>
            {console.log(stock)}
            <Text>{stock['01. symbol']}</Text>
            <Text>{Number(stock['05. price']).toFixed(2)}</Text>
            <View>
              <TouchableOpacity style={styles.buyBtn} onClick={() => {
                test
              }}>










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
  buyBtn: {
    backgroundColor: "#457B9D",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 50
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