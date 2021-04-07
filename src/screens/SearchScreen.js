import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SearchBar from '../components/search/SearchBar'
import SearchListItem from '../components/search/SearchListItem'
import { KeyboardHide } from "../components/misc/KeyboardHide"

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('')
  const [hasError, setErrors] = useState(false)
  const [stock, setStock] = useState()

  async function fetchData() {
    const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=WAD33GWL180QLM8L`);
    res
    .json()
    .then(res => setStock(res['bestMatches']))
    .catch(err => setErrors(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(
    <KeyboardHide>
      <View style={styles.container}>
        <SearchBar
          term={term} 
          onTermChange={(newTerm) => setTerm(newTerm)}
          onTermSubmit={() => {fetchData()}} />
        <SafeAreaView style={styles.container}>
          <FlatList
            keyExtractor={item => item['1. symbol']}
            data={stock}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Detail', item['1. symbol'])
                }}>
                  <SearchListItem item={item} />
                </TouchableOpacity>
              )
            }}
          />
        </SafeAreaView>
      </View>
    </KeyboardHide>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default SearchScreen