import React from 'react'
import { StyleSheet, ScrollView, Text, SafeAreaView, FlatList } from 'react-native'
import ValueOverview from '../components/home/ValueOverview'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'

const HomeScreen = () => {
  const placeholder = [ 
    { stockName: "detail1", company: "example", boughtAmount: 100, marketPrice: 200, boughtPrice: 100 },
    { stockName: "detail2", company: "example", boughtAmount: 200, marketPrice: 200, boughtPrice: 150 },
    { stockName: "detail3", company: "example2", boughtAmount: 100, marketPrice: 100, boughtPrice: 150 }
  ]

  return(
    <ScrollView style={styles.container}>
      <ValueOverview item={placeholder} />
      <ProfitLossTotal item={placeholder} />
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
    </ScrollView>
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