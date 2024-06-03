import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import React,{useState,useContext} from 'react';
import styles from '../../Styling/styles';
import { userContext } from '../../store/user';

export default function Preferences() {
  const [isOneEnabled,setIsOneEnabled] = useState(false)
  const [isTwoEnabled,setIsTwoEnabled] = useState(false)
  const {siv,setSiv} = useContext(userContext)

  
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
      <Text style={style.heading}>Preferences</Text>
      <View style={style.buttons}>
        <TouchableOpacity style={styles.meTopButtons}>
          <View style={style.buttonInner}>
            <Text style={styles.meTopButtonText}>Hide Status Bar</Text>
            <Switch 
            value={isOneEnabled}
            onValueChange={hideStatusBar}
            >
            </Switch>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.meTopButtons}>
          <View style={style.buttonInner}>
            <Text style={styles.meTopButtonText}>Darkmode</Text>
            <Switch
            value={isTwoEnabled}
            onValueChange={activateDarkMode}
            >
            </Switch>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
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
