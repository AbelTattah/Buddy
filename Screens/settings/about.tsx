import { View, Text ,StyleSheet,Linking, Button} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Markdown from 'react-native-markdown-display'

const info1 = `
# Buddy v1.0

`
const info2 = `
## What does Buddy do?

Buddy Gives you free instant Access to Books Just type the name of the book you want
to read and access it instantly
`

const info3 =`

## Can I contribute to Buddy?

Yes you can, click on the link below to access the github repository for this project


`

export default function About() {
  return (
    <View style={styles.container}>
       <View
       style={{
        width:340,
        gap:40,
        marginTop:40
       }}
       >
      <Markdown
      >{info1}</Markdown>
            <Markdown
      >{info2}</Markdown>
            <Markdown
      >{info3}</Markdown>
      </View>

     
      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL('https://github.com/AbelTattah/Buddy')}>
        <Text>Open</Text>
      </TouchableOpacity>
      <Text
        style={{
          position: 'absolute',
          bottom: 0,
          right: 10,
        }}>
        Made by Tattah Abel Mawunyo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    alignItems:'center'
  },
  heading1:{
    marginTop:40,
    fontSize:24,
    marginLeft:20,
    fontWeight:'bold'
  },
  heading2:{
    fontSize:20,
    marginLeft:-9,
    fontWeight:'bold'
  },
  normal:{
    fontSize:16,
    marginLeft:3,
    marginTop:-24,
    marginBottom:-28
  },
  body:{
    marginTop:80,
    marginLeft:20,
    gap:30
  },
  link:{
    width: 100,
    height: 46,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#fff",
    borderColor: "#00f",
    elevation:3,
    borderWidth:0.3,
    borderRadius: 10,
    justifyContent: "center",
    margin: 10,
    marginTop:60,
    marginRight: 40,
  }
})