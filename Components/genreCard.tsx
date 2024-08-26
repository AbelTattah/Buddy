import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {userContext} from '../store/user';
import Colors from './constants/Colors';

const GenreCard = ({
  genre,
  search,
  Icon,
}: {
  genre: string;
  search: () => any;
  Icon: any;
}) => {
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
          borderWidth: 0.2,
          elevation: 2,
          width: 150,
          padding: 4,
          borderRadius: 20,
          borderColor: theme == 'light' ? Colors.primary100 : Colors.primary200,
          backgroundColor:
            theme == 'light' ? Colors.primary200 : Colors.primary100,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 15,
            width: '50%',
            marginRight: 20,
            color: theme == 'light' ? Colors.primary100 : Colors.primary200,
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
