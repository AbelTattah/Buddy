import * as React from 'react'; // Importing components from react
import {NavigationContainer} from '@react-navigation/native'; // Importing the NavigationContainer from @react-navigation/native
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Button,
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  Appearance,
} from 'react-native'; // Importing components from react-native
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
import Home from './Screens/home';
import Icon from 'react-native-vector-icons/Ionicons';
import History from './Screens/history';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// The constant below allows the usage of the tab navigator
const Tab = createBottomTabNavigator();

// Main Application
function App1({navigation}: any) {
  const {isLoggedIn,setTheme, siv,setSiv, theme} = useContext(userContext);

  async function getColorScheme() {
    const colorScheme:any = await Appearance.getColorScheme()
    console.log("Theme: ",colorScheme)

    if (colorScheme=="dark") {
      setTheme("dark")
    }
    else {
      setTheme("light")
    }
  }

  async function getStatusBar() {
    const status = await AsyncStorage.getItem("status")

    if (status == "true") {
      setSiv(true)
    }
    else {
      setSiv(false)
    }

  }

  React.useEffect(()=>{
    getColorScheme()
    getStatusBar()
  },[])
  return (
    <>
      <StatusBar
        backgroundColor={theme == 'light' ? 'white' : 'black'}
        barStyle={theme == 'light' ? 'dark-content' : 'light-content'}
        hidden={siv}
      />
      {isLoggedIn ? (
        <NavigationContainer independent>
          <Tab.Navigator>
            <Tab.Screen
              component={Home}
              name="Home"
              options={{
                tabBarIcon: () => (
                  <Icon name="document-outline" size={25} color="#555" />
                ),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'FredokaBold',
                },
                tabBarStyle: {
                  height: 63,
                  paddingBottom: 10,
                  backgroundColor: theme == 'light' ? 'white' : 'black',
                  borderTopWidth: 0.5,
                },
                headerShadowVisible: false,
                headerTintColor: theme == 'light' ? 'black' : 'white',
                headerShown: false,
              }}
            />
            <Tab.Screen
              component={History}
              name="History"
              options={{
                tabBarIcon: () => (
                  <Icon name="time-outline" size={25} color="#555" />
                ),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'FredokaBold',
                },
                tabBarStyle: {
                  height: 63,
                  paddingBottom: 10,
                  backgroundColor: theme == 'light' ? 'white' : 'black',
                  borderTopWidth: 0.5,
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
                  <Icon name="settings-outline" size={25} color="#555" />
                ),
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontFamily: 'FredokaBold',
                },
                tabBarStyle: {
                  height: 63,
                  paddingBottom: 10,
                  backgroundColor: theme == 'light' ? 'white' : 'black',
                  borderTopWidth: 0.5,
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
            color={'#ccc'}
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
            options={{
              header:()=><Text style={{
                fontFamily:'GillSans-Italic',
                fontSize:20,
                backgroundColor:'#fff',
                paddingLeft:20,
                paddingTop:20,
                color:'#555'
              }}>Buddy</Text>,
              headerShadowVisible: false
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: '', headerShadowVisible: false}}
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
