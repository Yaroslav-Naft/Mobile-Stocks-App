import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ValueOverview = (props) => {
  const totalMarketPrice = props.item.reduce((total, current) => total = total + current.marketPrice*current.boughtAmount, 0)
  const totalBuyingPower = 30000

  return (
    <View style={styles.container}>
      <View style={[styles.block, styles.border]}>
        <Text style={styles.text}>Total Equity</Text>
        <Text style={styles.text}>{totalMarketPrice+totalBuyingPower}</Text>
      </View>
      <View style={[styles.block, styles.border]}>
        <Text style={styles.text}>Market Value</Text>
        <Text style={styles.text}>{totalMarketPrice}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>Buying Power</Text>
        <Text style={styles.text}>{totalBuyingPower}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#457B9D',
    borderRadius: 10
  },
  block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  border: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10
  }
})
  
export default ValueOverview