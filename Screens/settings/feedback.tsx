import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';

const Feedback = () => {
  let emotion:string = '';
  const [suggestion, setSuggestion] = useState<string>()

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
      <View>
        <Text>What was your experience?</Text>
        <View style={styles.emojis}>
          <TouchableOpacity onPress={() => emotion = 'sad'}>
            <Image
              source={require('../../assets/sad.png')}
              style={styles.emoji}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => emotion =  'dissapointed'}>
            <Image
              source={require('../../assets/dissapointment.png')}
              style={styles.emoji}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => emotion = 'happy'}>
            <Image
              source={require('../../assets/happy.png')}
              style={styles.emoji}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => emotion = 'love'}>
            <Image
              source={require('../../assets/love.png')}
              style={styles.emoji}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.suggestionsHeader}>Any Suggestions?</Text>
        <TextInput style={styles.suggestion}></TextInput>
        <TouchableOpacity onPress={()=>sendFeedback()} style={styles.send}></TouchableOpacity>
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
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  emojis: {
    flexDirection: 'row',
    height: '30%',
    gap: 17,
  },
  emoji: {
    width: 50,
    height: 48,
  },
  suggestionsHeader: {
    color: '#ddd',
  },
  suggestion: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    height:200,
    width:'80%'
  },
  send:{
    width: 300,
    height: 86,
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
