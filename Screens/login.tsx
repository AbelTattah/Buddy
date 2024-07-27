import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Image,
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

export async function SaveInStorage(data: any,name:"string") {
  try {
    await AsyncStorage.setItem(
      'Data',
      JSON.stringify({data: data, name: name}),
    );
  } catch (error) {
    console.log(error);
  }
}

// Login component
export default function Login({navigation}) {
  const [emaill, setEmaill] = useState(''); // Email state
  const [pass, setPass] = useState(''); // Password state
  const [suds, setSuds] = useState({}); // User data state
  const [regg, setRegg] = useState('Hm'); // Registration state
  const [checking,setChecking] = useState(true)
  const context = useContext(userContext);

  // Sign in function
  async function signIn() {
    if (emaill !== '' && pass !== '') {
      setRegg('inp');
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
            SaveInStorage(data,suds['SNAME']);
            context.setAuthState(true);
            context.setName(suds['SNAME']);
            setRegg('succ');
            navigation.navigate('App1');
          } else {
            setRegg('Hm');
            Alert.alert('Error', `${data.error.message}`, [
              {
                text: 'Ok',
              },
            ]);
          }
        })
        .catch(error => {
          setRegg('Hm');
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
      setTimeout(()=>{
        setChecking(false)
      },2000)
    }
    autoLogin();
  });

  if (checking) {
    return(<View style={{
      flex:1,
      justifyContent:'center',
      alignItems:"center",
      backgroundColor:"white"
    }}>
    <ActivityIndicator size={53} color="#999" />
    </View>)
  }

  // Render the page
  return (
    <View style={styles.loginMain}>
      <View style={{
        width:"75%",
        justifyContent:'flex-start',
        flexDirection:'row'
      }}>
      <Image style={{ marginTop:90,height:50,width:50}} source={require('../assets/logo.png')} />
      </View>
      <View style={{
        width:"72%",
        justifyContent:'flex-start',
        flexDirection:'row'
      }}>
      <Text
        style={{
          borderRadius: 10,
          marginTop:60,
          fontSize:33,
          color:"black",
          fontWeight:"700"
        }}>
        Login and 
      </Text>
      </View>
      <View style={{
        width:"72%",
        justifyContent:'flex-start',
        flexDirection:'row'
      }}>
      <Text style={{
        fontSize:20,
        color:"black"
      }}>
        Let's Start Reading!
      </Text>
      </View>
      <KeyboardAvoidingView style={styles.loginIn} behavior="padding">
        {/* Login inputs */}
        <TextInput
          style={[styles.loginTextIn,{color:"black"}]}
          inputMode="email"
          placeholder="   Email"
          autoCapitalize="none"
          placeholderTextColor="black"
          onChangeText={text => setEmaill(text)}
        />
        <TextInput
          secureTextEntry
          ref={input => {
            this.textInput1 = input;
          }}
          style={[styles.loginTextIn,{color:"black"}]}
          placeholder="   Password"
          autoCapitalize="none"
          placeholderTextColor="black"
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
        <Text style={{color:"black"}} >New to Buddy?</Text>
        <View style={styles.loginRegisterLines}></View>
      </View>
      <TouchableOpacity
          style={styles.loginReg}
          onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.loginRegText,{color:"black"}]}> Sign Up</Text>
        </TouchableOpacity>
      <>
        {regg === 'inp' ? (
          <>
            <Text style={{color:"black"}}>
              Logging in ... <ActivityIndicator color="#2407f2" />
            </Text>
          </>
        ) : regg === 'prob' ? (
          <>
            <Text style={{color:"black"}}>Wrong email or password!</Text>
          </>
        ) : regg === 'succ' ? (
          <>
            <Text style={{color:"black"}}>Log In Succesful</Text>
          </>
        ) : regg === 'no' ? (
          <>
            <Text style={{color:"black"}}>You do not have an accout. Go to the registration page</Text>
          </>
        ) : (
          <>
            <Text style={{color:"black",position:"absolute",bottom:10}}>Buddy v.1.0</Text>
          </>
        )}
      </>
    </View>
  );
}
