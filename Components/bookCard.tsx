// Book Card

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Colors from "../colors/colors";


const BookCard = ({image, bookTitle,explore,func}:any) => {
  const [imageLink,setImageLink] = useState("");
  useEffect(()=>{
    console.log(image)
    setImageLink(image)
  })
  if (explore==true){
    return (
      <TouchableOpacity onPress={func}>
        <View style={styles.container}>
                  <Image
                    source={{uri:imageLink}}
                    style={styles.profilePic}
                  />
          <View style={styles.cardText}>
              <Text style={styles.name}>{bookTitle}</Text>
              </View>
        </View>
      </TouchableOpacity>
      );
  }
  else {
    return (
        <View style={styles.container2}>
          <View style={styles.cardText}>
            {
              /* <Image
                    source={image}
                    style={styles.profilePic2}
                  /> 
              */
            }
            <>
            <Text style={styles.name}>{bookTitle}</Text>
            </>
          </View>
        </View>
      );
  }

};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent:'center',
    flexDirection:"column",
    padding: 10,
    width: "100%",
    backgroundColor:"white",
    borderWidth:0.2,
    height: 370,
    marginRight: 20,
    borderRadius: 15,
    marginBottom:25,
    overflow:'hidden'
  },
  container2: {
    alignItems: "center",
    justifyContent:'center',
    flexDirection:"column",
    borderWidth:0.2,
    padding: 10,
    width: 250,
    height: 200,
    backgroundColor:"white",
    marginRight: 20,
    borderRadius: 15,
    marginBottom:25,
    overflow:'hidden'
  },
  profilePic: {
    width: "90%",
    height: "70%",
    marginLeft:18,
    marginBottom:10,
    borderRadius:50
  },
  profilePic2: {
    width: 100,
    height: 100,
    marginLeft:18,
    marginBottom:10,
    borderRadius:50
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  count: {
    color: "black",
    fontSize: 12,
    marginRight: 130,
  },
  image: {
    width: 150,
    height: 155,
  },
  cardText: {
    width: "100%",
    flexDirection:'row',
  },
});
