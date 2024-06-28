import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import React,{useState,useContext} from 'react';
import styles from '../../Styling/styles';
import { userContext } from '../../store/user';

export default function Preferences() {
  const [isOneEnabled,setIsOneEnabled] = useState(false)
  const [isTwoEnabled,setIsTwoEnabled] = useState(false)
  const {siv,setSiv,theme,setTheme} = useContext(userContext)

  
  function activateDarkMode() {
      if (isTwoEnabled) {
        setIsTwoEnabled(false)
      }
      else {
        setIsTwoEnabled(true)
      }
  }

  function hideStatusBar() {
      if (isOneEnabled) {
        setIsOneEnabled(false)
        setSiv(false)
      }
      else {
        setIsOneEnabled(true)
        setSiv(true)
      }
  }

  return (
    <View style={style.container}>
      <Text style={style.heading}>Customize</Text>
      <View style={style.buttons}>
      <TouchableOpacity style={styles.button}>
        <Text
          style={[
            styles.option,
            { color: theme == "light" ? "black" : "white" },
          ]}
        >
          Hide Status bar
        </Text>
        <Switch
          value={isOneEnabled}
          onValueChange={hideStatusBar}
        />
      </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Text
          style={[
            styles.option,
            { color: theme == "light" ? "black" : "white" },
          ]}
        >
          Dark Theme
        </Text>
        <Switch
          value={theme == "light" ? false : true}
          onValueChange={activateDarkMode}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
  },
  buttons: {
    marginTop: 30,
  },
  buttonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
});
