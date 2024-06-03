import { View, Text ,StyleSheet,Linking, Button} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Buddy v1.0</Text>
      <View style={styles.body}>
        <Text style = {styles.heading2}> What does Buddy do?</Text>
        <Text style={styles.normal}>Buddy Gives you instant Access to Books</Text>
        <Text style={styles.normal}>Just type the name of the book you want to</Text>
        <Text style={styles.normal}>read and access it instantly</Text>
        <Text style={styles.normal}></Text>
      </View>
      <View style={styles.body}>
        <Text style = {styles.heading2}> Can I contribute to Buddy?</Text>
        <Text style={styles.normal}>Yes you can, click on the following link</Text>
        <Text style={styles.normal}>to access the github repository for this </Text>
        <Text style={styles.normal}>project</Text>
        <TouchableOpacity style={styles.link}  onPress={()=>Linking.openURL('https://github.com/AbelTattah/Buddy')}>
          <Text>Open</Text>
        </TouchableOpacity>
      </View>
      <Text style={{
        position:'absolute',
        bottom:0,
        right:10
      }}>Made by Tattah Abel Mawunyo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  heading1:{
    marginTop:40,
    fontSize:34,
    marginLeft:20,
    fontWeight:'bold'
  },
  heading2:{
    fontSize:26,
    marginLeft:-9,
    fontWeight:'bold'
  },
  normal:{
    fontSize:19,
    marginLeft:3,
    marginBottom:-28
  },
  body:{
    marginTop:30,
    marginLeft:20,
    gap:30
  },
  link:{
    width: 170,
    height: 46,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#fff",
    borderColor: "#00f",
    elevation:3,
    borderWidth:0.3,
    borderRadius: 30,
    justifyContent: "center",
    margin: 10,
    marginRight: 10,
  }
})