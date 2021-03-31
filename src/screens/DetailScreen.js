import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

const DetailScreen = ({route}) => {
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState({})

  async function fetchData() {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${route.params['1. symbol']}&apikey=WAD33GWL180QLM8L`);
    res
    .json()
    .then(res => setStock(res))
    .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(
    <View>
      { 
        !!stock ?
          <View>
            <Text>{stock['Global Quote']['01. symbol']}</Text>
            <Text>{Number(stock['Global Quote']['05. price']).toFixed(2)}</Text>
          </View>
        :
          <View>
            <Text>Loading...</Text>
          </View>
      }
    </View>
  )
}

export default DetailScreen;