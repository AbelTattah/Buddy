import React from 'react'; // Importing components from react
import {View, Text, TouchableOpacity} from 'react-native'; // Importing components from react-native
import styles from '../Styling/styles'; // Importing the styles from the styles file
import {userContext} from '../store/user';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Preferences from './settings/preferences';
import About from './settings/about';
import Feedback from './settings/feedback';

const stack = createStackNavigator();

// Settings page
export function Main({navigation}: any) {
  const context = useContext(userContext);

  // Logout function
  function Logout() {
    context.setAuthState(false);
    AsyncStorage.removeItem('token');
  }

  // Render the page
  return (
    <View style={styles.me}>
      <Text
        style={{
          padding: 40,
          fontSize: 35,
          fontWeight: 'bold',
        }}>
        Settings
      </Text>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.meTopButtonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => navigation.navigate('Preferences')}>
        <Text style={styles.meTopButtonText}>Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => navigation.navigate('Feedback')}>
        <Text style={styles.meTopButtonText}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.meTopButtons}
        onPress={() => {
          context.setAuthState(false);
          AsyncStorage.removeItem('Data');
        }}>
        <Text style={styles.meTopButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 100,
        }}>
        Buddy v1.0
      </Text>
    </View>
  );
}

export default function Settings() {
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator>
        <stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen name="Preferences" component={Preferences} />
        <stack.Screen name="About" component={About} />
        <stack.Screen name="Feedback" component={Feedback} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
