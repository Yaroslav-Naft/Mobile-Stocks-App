import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from '../components/SearchBar';

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('');

  return(
    <View>
      <SearchBar
        term={term} 
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => {}} />
      <TouchableOpacity onPress={() => {
        navigation.navigate('Detail')
      }}>
        <Text>To Detail</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SearchScreen;