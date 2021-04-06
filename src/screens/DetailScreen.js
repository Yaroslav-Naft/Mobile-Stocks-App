import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { firebase } from "../firebase/config"


const DetailScreen = ({ route }) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()
  
  const addStock = async () => {
    try {
      const res = await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      const userId = res.user.uid
      // // store the user in Firestore
      // const data = {
      //   id: userId,
      //   email,
      // }
      // const useRef = await firebase.firestore().collection("users")
      // await useRef.doc(userId).set(data)

      const portfolio = {
        userId: "test",
        stocks: ["", ""],
        cash: 50000,
      }
      
      const stock = {
        userId: "userId",
        symbol: "VFV",
        quotePrice: "test",
        numShares: "2"
      }
      
      const portfolioRef = firebase.firestore().collection("stocks")
      await portfolioRef.doc(userId).set(stock)

      // navigation.navigate("Home", { user: data })
    } catch (e) {
      alert(e)
    }
  }



  // const addStock = s => (
  //   console.log('Stock added')
  // )

  

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
    <View>
      {
        stock ?
          <View>
            {console.log(stock)}
            <Text>{stock['01. symbol']}</Text>
            <Text>{Number(stock['05. price']).toFixed(2)}</Text>
            <View>
              <TouchableOpacity style={styles.buyBtn} onPress={() => addStock()}>
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