import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ValueOverview from '../components/home/ValueOverview'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'
import { firebase } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState();
  const [stockArr, setStockArr] = useState([])

  useEffect(() => {
    const uId = firebase.auth().currentUser.uid
    firebase.firestore().collection("stocks")
      .where("userId", "==", uId)
      .get()
      .then((querySnapshot) => {
        const myStocks = []
        querySnapshot.forEach((doc) => {
          myStocks.push(doc.data())
        });
        setStockArr(myStocks)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [user])

  console.log("give me the dataaaa")
  console.log(stockArr)

  const placeholder = [
    { stockName: "IBM", company: "example", boughtAmount: 100, marketPrice: 200, boughtPrice: 100 },
    { stockName: "IBMJ", company: "example", boughtAmount: 200, marketPrice: 200, boughtPrice: 150 },
    { stockName: "IBMM", company: "example2", boughtAmount: 100, marketPrice: 100, boughtPrice: 150 }
  ]

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ValueOverview item={placeholder} />
          <ProfitLossTotal item={placeholder} />
          <Text style={styles.title}>My Position</Text>
        </>
      }
      keyExtractor={item => item.id}
      data={stockArr}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Detail', item.symbol)
          }}>
            <BoughtStockListItem item={item} />
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default HomeScreen