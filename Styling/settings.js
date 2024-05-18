import React from 'react'; // Importing components from react
import {View, Text, TouchableOpacity} from 'react-native'; // Importing components from react-native
import styles from '../../Styling/styles'; // Importing the styles from the styles file
import {userContext} from '../user';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Settings page
export default function Settings({navigation}) {
  const context = useContext (userContext);

  // Logout function
  function Logout () {
    context.setAuthState (false);
    AsyncStorage.removeItem ('token');
  }

  // Render the page
  return (
    <View style={styles.me}>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => Logout ()}
        title="logout"
      >
        <Text style={styles.meTopButtonText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => Logout ()}
        title="logout"
      >
        <Text style={styles.meTopButtonText}>Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => Logout ()}
        title="logout"
      >
        <Text style={styles.meTopButtonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => Logout ()}
        title="logout"
      >
        <Text style={styles.meTopButtonText}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => Logout ()}
        title="logout"
      >
        <Text style={styles.meTopButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
