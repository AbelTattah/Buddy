import React, {useState} from 'react'; // Importing components from react
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native'; // Importing components from react-native
import {userContext} from '../store/user';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Preferences from './settings/preferences';
import About from './settings/about';
import Feedback from './settings/feedback';
import Icon from 'react-native-vector-icons/Ionicons';
import {getHistory} from './history';
import Header from '../Components/header';
import Colors from '../Components/constants/Colors';

const stack = createStackNavigator();

// Settings page
export function Main({navigation}: any) {
  const context = useContext(userContext);
  const [clearing, setClearing] = useState(false);
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
        backgroundColor:
          theme == 'light' ? Colors.primary200 : Colors.primary100,
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
      }}>
      <View
        style={{
          width: '87%',
          gap:25
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Preferences')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? Colors.primary100 : Colors.primary200},
            ]}>
            Preferences
          </Text>
          <Icon name="chevron-forward" size={22}
            color={theme == 'light' ? Colors.primary100 : Colors.primary200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? Colors.primary100 : Colors.primary200},
            ]}>
            Feedback
          </Text>
          <Icon
            name="chevron-forward"
            size={22}
            color={theme == 'light' ? Colors.primary100 : Colors.primary200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? Colors.primary100 : Colors.primary200},
            ]}>
            About
          </Text>
          <Icon
            name="chevron-forward"
            size={22}
            color={theme == 'light' ? Colors.primary100 : Colors.primary200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            context.setAuthState(false);
            await AsyncStorage.removeItem('Data');
          }}
          style={styles.button}>
          <Text
            style={[
              styles.option,
              {color: theme == 'light' ? Colors.primary100 : Colors.primary200},
            ]}>
            Logout
          </Text>
          <Icon
            name="exit"
            size={22}
            color={theme == 'light' ? Colors.primary100 : Colors.primary200}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          position: 'absolute',
          bottom: 50,
          color: theme == 'light' ? Colors.primary100 : Colors.primary200,
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
            header: () => (
              <Header
                title="Settings"
                sub="Manage your account"
                button={<></>}
              />
            ),
          }}
        />
        <stack.Screen
          name="Preferences"
          options={{
            header: () => (
              <Header
                title="Preferences"
                sub="Customize your app"
                button={<></>}
              />
            ),
          }}
          component={Preferences}
        />
        <stack.Screen
          name="About"
          options={{
            header: () => (
              <Header title="About" sub="Learn more about us" button={<></>} />
            ),
          }}
          component={About}
        />
        <stack.Screen
          options={{
            header: () => (
              <Header
                title="Feedback"
                sub="Report a bug or suggest a feature"
                button={<></>}
              />
            ),
          }}
          name="Feedback"
          component={Feedback}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  option: {
    fontSize: 18,
    fontWeight: '400',
  },
});
