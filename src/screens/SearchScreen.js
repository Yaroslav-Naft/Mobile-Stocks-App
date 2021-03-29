import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';
import SearchListItem from '../components/SearchListItem';

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('');

  const placeholder = [ 
    { stockName: "detail1", company: "example" },
    { stockName: "detail2", company: "example" },
    { stockName: "detail3", company: "example2" }
  ]

  return(
    <View>
      <SearchBar
        term={term} 
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {}} />
      <ScrollView>
      <FlatList
        keyExtractor={item => item.stockName}
        data={placeholder}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Detail', item)
            }}>
              <SearchListItem item={item} />
            </TouchableOpacity>
          )
        }}
      />
      </ScrollView>
    </View>
  )
}

export default SearchScreen;