import * as React from 'react'; // Importing components from react
import {NavigationContainer} from '@react-navigation/native'; // Importing the NavigationContainer from @react-navigation/native
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, View, Text, Image, StatusBar, Alert} from 'react-native'; // Importing components from react-native
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Importing the createBottomTabNavigator from @react-navigation/bottom-tabs

// Importing the styles from the styles file
import Settings from './Screens/settings';
// Rest of the import statements
//import Login from "./Screens/login";
// Importing the store from the redux store
//import Register from "./Screens/register";
//import { StatusBar } from "expo-status-bar";
import {useContext} from 'react';
import {userContext} from './store/user';
import UserContextProvider from './store/user';
import DocumentNav from './Documents/Document';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Login from './Screens/login';
import Register from './Screens/register';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// The constant below allows the usage of the tab navigator
const Tab = createBottomTabNavigator();

// Main Application
function App1({navigation}: any) {
  const {isLoggedIn, siv} = useContext(userContext);
  return (
    <>
      <StatusBar hidden={siv} />
      {isLoggedIn ? (
        <NavigationContainer independent>
          <Tab.Navigator>
            <Tab.Screen
              component={DocumentNav}
              name="Document"
              options={{
                tabBarIcon: (color, size) => (
                  <Image
                    source={require('./assets/documents.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 50,
                    }}
                  />
                ),
                tabBarLabelStyle: {
                  marginLeft: 50,
                  fontSize: 12,
                  fontFamily: 'FredokaBold',
                },
                tabBarStyle: {
                  height: 80,
                  paddingBottom: 10,
                  backgroundColor: 'white',
                  borderTopWidth: 2,
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: false,
                tabBarIcon: () => (
                  <Image
                    source={require('./assets/cogwheel.png')}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 50,
                    }}
                  />
                ),
                tabBarLabelStyle: {
                  marginRight: 50,
                  fontSize: 12,
                  fontFamily: 'FredokaBold',
                },
                tabBarStyle: {
                  height: 80,
                  paddingBottom: 10,
                  backgroundColor: 'white',
                  borderTopWidth: 2,
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  height: 110,
                  borderBottomWidth: 0,
                  backgroundColor: '#00f9',
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>You are not Logged in!</Text>
          <Button
            title="Login Screen"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      )}
    </>
  );
}

export default function App() {
  React.useEffect(() => {
    async function checkWrite() {
      check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            Alert.alert(
              'Storage permissions',
              'You have to allow write storage permissions to use this app',
              [{text: 'Ok'}],
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
        }
      });
    }

    async function checkRead() {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            Alert.alert(
              'Storage permissions',
              'You have to allow read storage permissions to use this app',
              [{text: 'Ok'}],
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
        }
      });
    }

    checkRead();
    checkWrite();
  }, []);
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: 'Buddy', headerShadowVisible: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: 'Sign Up', headerShadowVisible: false}}
          />
          <Stack.Screen
            name="App1"
            component={App1}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

/*
      TODO :
      1. Bottom Navigation     :Done
      2. Add swiping features that will enable user to navigate to other options.
*/
