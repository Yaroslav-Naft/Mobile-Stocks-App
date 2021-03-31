import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';
import SearchListItem from '../components/SearchListItem';

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('IBM');
  const [hasError, setErrors] = useState(false);
  const [stock, setStock] = useState({});
  const [stockSymbol, setStockSymbol] = useState("")
  const [stockPrice, setStockPrice] = useState("")

  const placeholder = [ 
    { stockName: "detail1", company: "example" },
    { stockName: "detail2", company: "example" },
    { stockName: "detail3", company: "example2" }
  ]


  async function fetchData() {
    const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=WAD33GWL180QLM8L`);
    res
    .json()
    .then(res => setStock(res))
    .catch(err => setErrors(err));
    console.log(stock)
}

useEffect(() => {
  fetchData();
  console.log(stock)
}, []);


  return(
    <View>
      <SearchBar
        term={term} 
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {fetchData()}} />
      <SafeAreaView>
        <FlatList
          keyExtractor={item => item["Global Quote"]["01. symbol"]}
          data={stock}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.navigate('Detail', item)
              }}>
                <Text></Text>
                <SearchListItem item={item} />
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    </View>
  )
}

export default SearchScreen;