import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';

const Feedback = () => {
  let emotion:string = '';
  const [suggestion, setSuggestion] = useState<string>()
  const [opacites,setOpacities] = useState<any[]>([
    1,
    1,
    1,
    1
  ])

  function setOpacity(indexx:number) {
    setOpacities(previous=>previous.map((item,index)=>{
      if (indexx!==index) {
        return 0.2
      }
      else {
        return 1
      }
    }))
  }

  async function sendFeedback() {
    try {
      axios.post('', {
        feedback: emotion,
        suggestion:suggestion
      });
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Feedback</Text>
      <View style = {styles.emojisMain}>
        <Text>What was your experience?</Text>
        <View style={styles.emojis}>
          <TouchableOpacity onPress={() =>{ 
            emotion = 'sad'
            setOpacity(0)
            }}>
            <Image
              source={require('../../assets/sad.png')}
              style={ {
                width: 50,
                height: 50,
                marginTop:14,
                opacity:opacites[0]
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            emotion =  'dissapointed'
            setOpacity(1)
            }}>
            <Image
              source={require('../../assets/dissapointment.png')}
              style={{
                width: 50,
                height: 50,
                marginTop:14,
                opacity:opacites[1]
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {
            emotion =  'happy'
            setOpacity(2)
            }}>
            <Image
              source={require('../../assets/happy.png')}
              style={{
                width: 50,
                height: 50,
                marginTop:14,
                opacity:opacites[2]
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            emotion =  'love'
            setOpacity(3)
            }}>
            <Image
              source={require('../../assets/love.png')}
              style={{
                width: 50,
                height: 50,
                marginTop:14,
                opacity:opacites[3]
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.emojisMain}>
        <Text style={styles.suggestionsHeader}>Any Suggestions?</Text>
        <TextInput style={styles.suggestion}></TextInput>
        <TouchableOpacity onPress={()=>sendFeedback()} style={styles.send}>
          <Text style={styles.heading}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  emojisMain:{
    justifyContent:'center',
    alignItems:'center'
  },
  emojis: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    height: '30%',
    gap: 17,
  },
  suggestionsHeader: {
    color: '#444',
    marginTop:16
  },
  suggestion: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginTop:20,
    marginBottom:30,
    height:120,
    width:270
  },
  send:{
    width: 270,
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
});
