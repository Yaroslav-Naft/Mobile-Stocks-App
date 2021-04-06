import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ValueOverview from '../components/home/ValueOverview'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'
import { firebase } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState();

  function fetchUser() {
    const uId = firebase.auth().currentUser.uid
    const userDoc = firebase.firestore().collection('users').doc(uId)
    userDoc.onSnapshot((doc) => {
      setUser(doc.data());
    })
  }
  useEffect(() => {
    fetchUser();
  }, [])


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
      keyExtractor={item => item.stockName}
      data={placeholder}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Detail', item.stockName)
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