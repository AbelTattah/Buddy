import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const GenreCard = ({genre,search}:any) => {
  return (
    <TouchableOpacity onPress={search}>
    <View style={styles.container}>
      <Text style={styles.genre}>{genre}</Text>
    </View>
    </TouchableOpacity>
  )
}

export default GenreCard;

const styles = StyleSheet.create({
    container: {
        height:40,
        justifyContent:'center',
        marginRight:10,
        alignItems:'center',
        width:150,
        padding:4,
        borderRadius:10,
        backgroundColor:'#ddd'
    },
    genre:{
        fontWeight:"700",
        fontSize:17
    }
})