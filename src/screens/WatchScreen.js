import React, { useEffect, useState } from "react"
import { StyleSheet, Text, FlatList } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import WatchListItem from "../components/watch/WatchListItem"
import { firebase } from "../firebase/config"

const WatchScreen = ({ navigation }) => {
  const [watchlist, setWatchlist] = useState([])
  const [stockPrice, setStockPrice] = useState([])

  useEffect(() => {
    getAllUserWatchlist()
  }, [])

  const getAllUserWatchlist = () => {
    const userId = firebase.auth().currentUser.uid
    firebase
      .firestore()
      .collection("watchlist")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setWatchlist([...watchlist, doc.data()])
        })
      })
      .then(() => populateStockPrice())
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  const populateStockPrice = () => {
    watchlist.forEach((stock) => {
      fetchWatchlist(stock.symbol)
    })
  }

  const fetchWatchlist = async (symbol) => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=WAD33GWL180QLM8L`
    )
    res
      .json()
      .then((res) =>
        setStockPrice([...stockPrice, res["Globale Quote"]["05. price"]])
      )
      .catch((err) => console.log(err))
  }

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.title}>My Watched Stock</Text>
        </>
      }
      keyExtractor={(item) => item.symbol}
      data={watchlist}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Detail", item.symbol)
            }}
          >
            <WatchListItem item={item} />
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
})

export default WatchScreen
