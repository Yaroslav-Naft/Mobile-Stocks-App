import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const DetailScreen = () => {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.buyBtn}>
        <Text style={styles.buy}> BUY </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sellBtn}>
        <Text style={styles.sell}> SELL </Text>
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    backgroundColor: "white",
  },
  buyBtn: {
    backgroundColor: "#457B9D",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 30,
  },
  buy: {
    color: "white",
    fontSize: 25,
    fontWeight: "800"
  },

  sellBtn: {
    borderColor: "#457B9D",
    borderStyle: "solid",
    borderWidth: 5,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30
  },
  sell: {
    color: "#457B9D",
    fontSize: 25,
    fontWeight: "800"
  }
})



export default DetailScreen;