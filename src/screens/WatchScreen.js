import React, { useEffect, useState } from "react"
import { StyleSheet, Text, FlatList } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import WatchListItem from "../components/watch/WatchListItem"
import { firebase } from "../firebase/config"

const WatchScreen = ({ navigation }) => {
  const placeholder = [
    { stockName: "IBM", company: "example", marketPrice: 200 },
    { stockName: "IBMJ", company: "example", marketPrice: 200 },
    { stockName: "IBMM", company: "example2", marketPrice: 100 },
  ]

  const [watchlist, setWatchlist] = useState([])

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
      .catch((error) => {
        console.log("Error getting documents: ", error)
      })
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
