import React from 'react'
import { StyleSheet, ScrollView, Text, SafeAreaView, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ValueOverview from '../components/home/ValueOverview'
import ProfitLossTotal from '../components/home/ProfitLossTotal'
import BoughtStockListItem from '../components/home/BoughtStockListItem'

const HomeScreen = ({navigation}) => {
  const placeholder = [ 
    { stockName: "IBM", company: "example", boughtAmount: 100, marketPrice: 200, boughtPrice: 100 },
    { stockName: "IBMJ", company: "example", boughtAmount: 200, marketPrice: 200, boughtPrice: 150 },
    { stockName: "IBMM", company: "example2", boughtAmount: 100, marketPrice: 100, boughtPrice: 150 }
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
              <TouchableOpacity onPress={() => {
                navigation.navigate('Detail', item.stockName)
              }}>
                <BoughtStockListItem item={item} />
              </TouchableOpacity>
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