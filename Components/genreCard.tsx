import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const GenreCard = ({genre,search,Icon}:any) => {
  return (
    <TouchableOpacity onPress={search}>
    <View style={styles.container}>
      <Text style={styles.genre}>{genre}</Text>
      <>{Icon}</>
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
        flexDirection:'row',
        width:150,
        padding:4,
        borderRadius:10,
        backgroundColor:'#fff',
        borderWidth:0.2
    },
    genre:{
        fontWeight:"700",
        fontSize:15,
        marginRight:20
    }
})