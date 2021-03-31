import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'

const HomeScreen = () => {
  const placeholder = [ 
    { stockName: "detail1", company: "example", boughtAmount: 100, marketPrice: 200, boughtPrice: 100 },
    { stockName: "detail2", company: "example", boughtAmount: 200, marketPrice: 200, boughtPrice: 150 },
    { stockName: "detail3", company: "example2", boughtAmount: 100, marketPrice: 100, boughtPrice: 150 }
  ]

  return(
    <View style={styles.container}>
      <ProfitLossTotal item={placeholder}/>
      <Text style={styles.title}>My Position</Text>
      <SafeAreaView>
        <FlatList
          keyExtractor={item => item.stockName}
          data={placeholder}
          renderItem={({ item }) => {
            return (
              <BoughtStockListItem item={item} />
            )
          }}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default HomeScreen