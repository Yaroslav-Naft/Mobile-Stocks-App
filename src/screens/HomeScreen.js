import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ValueOverview from '../components/home/ValueOverview'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'
import { firebase } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  // const [user, setUser] = useState();
  cosnt[arr, setArr] = useState([])

  const uId = firebase.auth().currentUser.uid
  firebase.firestore().collection("stocks").where("userId", "==", uId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


  // async function fetchUser() {
  //   const uId = await firebase.auth().currentUser.uid
  //   const stockDB = await firebase.firestore().collection('stocks')
  //     .where("userId", "==", uId).get()
  //   // userDoc.onSnapshot((doc) => {
  //   //   setUser(doc.data());
  //   // })

  //   const dataST = await stockDB.data()
  //   { console.log("whtat") }
  //   { console.log(dataST) }
  // }
  // useEffect(() => {
  //   fetchUser();
  // }, [])

  // { console.log(user) }


  // const uId = firebase.auth().currentUser.uid
  // const portfolioDB = firebase.firestore().collection('stocks').doc(uId)
  // portfolioDB.where("userId", "==", uId)
  //   .onSnapshot.forEach((doc) => {
  //     console.log(doc.id, "=>", doc.data())
  //   })
  //   .catch((error) => {
  //     console.log("Error getting documents: ", error);
  //   })


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