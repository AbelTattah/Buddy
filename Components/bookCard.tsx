// Book Card

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../colors/colors";


const BookCard = ({image="Hllo", bookTitle,explore,func}:any) => {
  if (explore==true){
    return (
      <TouchableOpacity onPress={func}>
        <View style={[styles.container,{backgroundColor:Colors.primary300}]}>
          <View style={styles.cardText}>
              {
              /* 
                  <Image
                    source={image}
                    style={styles.profilePic}
                  />
              */
              }
            <> 
              <Text style={styles.name}>{bookTitle}</Text>
            </>
          </View>
        </View>
      </TouchableOpacity>
      );
  }
  else {
    return (
        <View style={[styles.container,{backgroundColor:Colors.primary300}]}>
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
    padding: 10,
    width: 200,
    height: 170,
    marginRight: 20,
    borderRadius: 15,
  },
  container2: {
    alignItems: "center",
    padding: 10,
    width: 350,
    height: 230,
    marginRight: 20,
    borderRadius: 15,
  },
  profilePic: {
    width: 50,
    height: 52,
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
