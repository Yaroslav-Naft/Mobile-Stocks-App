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
    let copyWatchlist = []
    const userId = firebase.auth().currentUser.uid
    firebase
      .firestore()
      .collection("watchlists")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          copyWatchlist.push(doc.data())
        })
        setWatchlist(copyWatchlist)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
  }

  // render the up-to-date price
  const fetchWatchlist = async (symbol) => {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=WAD33GWL180QLM8L`
    )
    res
      .json()
      .then((res) => {
        setWatchlist([
          ...watchlist,
          {
            symbol: res["Global Quote"]["01. symbol"],
            price: res["Global Quote"]["05. price"],
          },
        ])
      })
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
