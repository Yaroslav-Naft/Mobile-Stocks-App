import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import WatchListItem from '../components/watch/WatchListItem'

const WatchScreen = ({navigation, user}) => {
  const placeholder = [ 
    { stockName: "IBM", company: "example", marketPrice: 200 },
    { stockName: "IBMJ", company: "example", marketPrice: 200, },
    { stockName: "IBMM", company: "example2", marketPrice: 100, }
  ]
  console.log('the user is')
  console.log(user)

  return(
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.title}>My Watched Stock</Text>
        </>
      }
      keyExtractor={item => item.stockName}
      data={placeholder}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Detail', item.stockName)
          }}>
            <WatchListItem item={item} />
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

export default WatchScreen