import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import React,{useState,useContext} from 'react';
import styles from '../../Styling/styles';
import { userContext } from '../../store/user';

export default function Preferences() {
  const {siv,setSiv,theme,statusBar,setStatusBar,setTheme} = useContext(userContext)
  const [isOneEnabled,setIsOneEnabled] = useState(false)
  const [isTwoEnabled,setIsTwoEnabled] = useState(theme == "dark" ? true : false)

  
  function activateDarkMode() {
    if (theme == "dark") {
      setTheme("light")
      setIsTwoEnabled(false)
    }
    else {
      setTheme("dark")
      setIsTwoEnabled(true)
    }
  }

  function hideStatusBar() {
      if (statusBar) {
        setStatusBar(false)
        setSiv(true)
      }
      else {
        setStatusBar(true)
        setSiv(false)
      }
  }

  return (
    <View style={ {
      flex: 1,
      backgroundColor: theme == "light" ? "white" : "black",
      alignItems: 'center',
    }}>
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
          value={statusBar}
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
  heading: {
    fontSize: 28,
  },
  buttons: {
    marginTop: 30,
    width:"87%"
  },
  buttonInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
  },
});
