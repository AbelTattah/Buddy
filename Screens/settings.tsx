import React,{useState} from 'react'; // Importing components from react
import {View, Text, TouchableOpacity, Switch, ActivityIndicator, Alert} from 'react-native'; // Importing components from react-native
import styles from '../Styling/styles'; // Importing the styles from the styles file
import {userContext} from '../store/user';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Preferences from './settings/preferences';
import About from './settings/about';
import Feedback from './settings/feedback';
import Icon from 'react-native-vector-icons/Ionicons';
import { getHistory } from './history';

const stack = createStackNavigator();

// Settings page
export function Main({navigation}: any) {
  const context = useContext(userContext);
  const [clearing,setClearing] = useState(false);
  const {theme, setTheme} = useContext(userContext);

  async function activateDarkMode() {
    if (theme == 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  }

  // Logout function
  function Logout() {
    context.setAuthState(false);
    AsyncStorage.removeItem('token');
  }

  // Render the page
  return (
    <View
      style={{
        backgroundColor: theme == 'light' ? 'white' : 'black',
        flex: 1,
        alignItems: 'center',
        paddingTop: 120,
      }}>
      <Text
        style={[styles.title, {color: theme == 'light' ? 'black' : 'white'}]}>
        Settings
      </Text>
      <View
        style={{
          width: '87%',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Preferences')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? 'black' : 'white'},
            ]}>
            Preferences
          </Text>
          <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? 'black' : 'white'},
            ]}>
            Feedback
          </Text>
          <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? 'black' : 'white'},
            ]}>
            About
          </Text>
          <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
        <Text
          style={[
            styles.option,
            { color: theme == "light" ? "black" : "white" },
          ]}
        >
          Change Password
        </Text>
        <Icon name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity> */}
        <TouchableOpacity
          onPress={async () => {
            context.setAuthState(false);
            await AsyncStorage.removeItem('Data');
          }}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? 'black' : 'white'},
            ]}>
            Logout
          </Text>
          <Icon name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          position: 'absolute',
          bottom: 50,
          color: theme == 'light' ? 'black' : 'white',
        }}>
        Buddy v1.0
      </Text>
    </View>
  );
}

export default function Settings() {
  const {theme} = useContext(userContext);
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
        <stack.Screen
          name="Preferences"
          options={{
            headerStyle: {
              backgroundColor: theme == 'light' ? 'white' : 'black',
            },
            headerTintColor: theme == 'light' ? 'black' : 'white',
          }}
          component={Preferences}
        />
        <stack.Screen
          name="About"
          options={{
            headerStyle: {
              backgroundColor: theme == 'light' ? '#fff' : '#000',
            },
            headerTintColor: theme == 'light' ? '#000' : '#fff',
          }}
          component={About}
        />
        <stack.Screen
          options={{
            headerStyle: {
              backgroundColor: theme == 'light' ? '#fff' : '#000',
            },
            headerTintColor: theme == 'light' ? '#000' : '#fff',
          }}
          name="Feedback"
          component={Feedback}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
