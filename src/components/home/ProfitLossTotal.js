import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ProfitLossTotal = (props) => {
  const totalProfitLoss = props.item.reduce((total, current) => total = total + (current.marketPrice-current.boughtPrice)*current.boughtAmount, 0)
  const totalBoughtPrice = props.item.reduce((total, current) => total = total + current.boughtPrice*current.boughtAmount, 0)

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.text}>Profit/Loss</Text>
        <Text style={styles.text}>{totalProfitLoss}</Text>
      </View>
      <View style={styles.endBlock}>
        <Text style={styles.text}>PL %</Text>
        <Text style={styles.text}>{((totalProfitLoss/totalBoughtPrice)*100).toFixed(1)}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10
  },
  block: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  endBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 10,
    textTransform: 'uppercase'
  }
})
  
export default ProfitLossTotal