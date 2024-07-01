import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {userContext} from '../store/user';

const GenreCard = ({genre, search, Icon}: any) => {
  const {theme} = useContext(userContext);

  return (
    <TouchableOpacity onPress={search}>
      <View
        style={{
          height: 40,
          justifyContent: 'center',
          marginRight: 10,
          alignItems: 'center',
          flexDirection: 'row',
          width: 150,
          padding: 4,
          borderColor: theme == 'light' ? '#000' : '#fff',
          borderRadius: 10,
          backgroundColor: theme == 'light' ? '#fff' : '#000',
          borderWidth: 0.2,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 15,
            marginRight: 20,
            color: theme == 'light' ? '#000' : '#fff',
          }}>
          {genre}
        </Text>
        <>{Icon}</>
      </View>
    </TouchableOpacity>
  );
};

export default GenreCard;

const styles = StyleSheet.create({
  genre: {
    fontWeight: '700',
    fontSize: 15,
    marginRight: 20,
  },
});
