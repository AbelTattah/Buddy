import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native'; // Importing components from react-native
import styles from '../Styling/styles'; // Importing the styles from the styles file
import {useEffect, useState, useLayoutEffect} from 'react'; // Importing the useEffect and useState component from react
import {db} from '../firebase'; // Importing the db from the firebase
import {doc, getDoc} from 'firebase/firestore'; // Importing the doc and getDoc from firebase/firestore
import {userContext} from '../store/user';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../colors/colors';

// Login component
export default function Login({navigation}) {
  const [emaill, setEmaill] = useState(''); // Email state
  const [pass, setPass] = useState(''); // Password state
  const [suds, setSuds] = useState({}); // User data state
  const [regg, setRegg] = useState('Hm'); // Registration state
  const context = useContext(userContext);

  // Sign in function
  async function signIn() {
    if (emaill !== '' && pass !== '') {
      await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.FIREBASE_KEY,
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emaill,
            password: pass,
            returnSecureToken: true,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.error == undefined) {
            SaveInStorage(data);
            context.setAuthState(true);
            context.setName(suds['SNAME']);
            navigation.navigate('App1');
          } else {
            Alert.alert('Error', `${data.error.message}`, [
              {
                text: 'Ok',
              },
            ]);
          }
        })
        .catch(error => {
          Alert.alert('Error', error.message, [
            {
              text: 'Ok',
            },
          ]);
        });
    } else {
      Alert.alert('Form', 'Form is not complete', [
        {
          text: 'OK',
        },
      ]);
    }
  }

  async function SaveInStorage(data: any) {
    try {
      await AsyncStorage.setItem(
        'Data',
        JSON.stringify({data: data, name: suds['SNAME']}),
      );
    } catch (error) {
      console.log(error);
    }
  }

  // function to read user data from firestore
  async function DataRead() {
    // Get user data from firestore
    const docRef = doc(db, `users/user/buddy/${emaill}`);
    const docSnap = await getDoc(docRef);
    // Check if user data exists and set user data state
    if (docSnap.exists()) {
      setSuds(docSnap.data());
      console.log(suds);
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  useEffect(() => {
    // Get user data from firestore
    DataRead();
  }, [emaill]);

  useEffect(() => {
    async function autoLogin() {
      try {
        //Check whether key is available in storage
        const response = await AsyncStorage.getItem('Data');
        console.log('Data', response);
        if (response == null) {
          console.log(response);
        } else {
          navigation.navigate('App1');
          let name = JSON.parse(response).name;
          context.setName(name);
          context.setAuthState(true);
        }
      } catch (error) {
        //Do nothing
      }
    }
    autoLogin();
  });

  // Render the page
  return (
    <View style={styles.loginMain}>
      <Text
        style={{
          borderRadius: 10,
          marginTop:70,
          fontSize:33,
          marginRight:80,
          color:"black"
        }}>
        Welcome Back!
      </Text>
      <Text style={{
        marginBottom:60,
        marginRight:170
      }}>
        Let's Start Reading!
      </Text>
      <KeyboardAvoidingView style={styles.loginIn} behavior="padding">
        {/* Login inputs */}
        <TextInput
          style={styles.loginTextIn}
          inputMode="email"
          placeholder="   Email"
          autoCapitalize="none"
          onChangeText={text => setEmaill(text)}
        />
        <TextInput
          secureTextEntry
          ref={input => {
            this.textInput1 = input;
          }}
          style={styles.loginTextIn}
          placeholder="   Password"
          autoCapitalize="none"
          onChangeText={text => setPass(text)}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      {/* <Text style={styles.loginTextt1}>Forgot password?</Text>
      <Text style={styles.loginTextt2}>Privacy</Text> */}
      <View style={styles.regButtonView}>
        <View style={styles.loginRegisterLines}></View>
        <Text>New to Buddy?</Text>
        <View style={styles.loginRegisterLines}></View>
      </View>
      <TouchableOpacity
          style={styles.loginReg}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.loginRegText}> Sign Up</Text>
        </TouchableOpacity>
      <>
        {regg === 'inp' ? (
          <>
            <Text>
              Logging in ... <ActivityIndicator color="#2407f2" />
            </Text>
          </>
        ) : regg === 'prob' ? (
          <>
            <Text>Wrong email or password!</Text>
          </>
        ) : regg === 'succ' ? (
          <>
            <Text>Log In Succesful</Text>
          </>
        ) : regg === 'no' ? (
          <>
            <Text>You do not have an accout. Go to the registration page</Text>
          </>
        ) : (
          <>
            <Text>Buddy v.1.0</Text>
          </>
        )}
      </>
    </View>
  );
}
