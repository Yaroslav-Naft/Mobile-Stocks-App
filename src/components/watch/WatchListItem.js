import React from "react"
import { StyleSheet, View, Text, Button } from "react-native"

const WatchListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.headText}>{props.item.symbol}</Text>
        <Text style={styles.subText}>{props.item.company}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.subText}>Market Price</Text>
        <Text style={styles.numText}>{props.item.price}</Text>
      </View>
      <Button title="-" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    margin: 10,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
  },
  block: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  headText: {
    fontSize: 10,
  },
  subText: {
    color: "#A8DADC",
    fontSize: 8,
  },
  numText: {
    fontSize: 8,
  },
})

export default WatchListItem
