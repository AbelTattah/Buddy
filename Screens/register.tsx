import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from '../Styling/styles'; // Importing the styles from the styles file
import {useState, useRef} from 'react'; // Importing the useState and useEffect component from react
import {setDoc, doc} from 'firebase/firestore'; // Importing the setDoc and doc from firebase/firestore
import {db} from '../firebase'; // Importing the db from the firebase
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../colors/colors';

// Register component
export default function Register({navigation}) {
  const [sid, setSid] = useState(0); // Student ID state
  const [nameid, setNameid] = useState(''); // Name state
  const [pass, setPass] = useState(''); // Password state
  const [pass1, setPass1] = useState(''); // Confirm password state
  const [email, setEmail] = useState(''); // Email state
  const [regg, setRegg] = useState('rnd'); // Registration state
  const [sign, setSign] = useState(false); // Sign up state

  const ref = useRef('textInput');

  // function to create user collection in firestore
  async function createUserCollection() {
    try {
      // Add a new document in collection "users"
      const docRef = await setDoc(doc(db, 'users', `user/buddy/${email}`), {
        SNAME: nameid,
      });
      //console.log(docRef.response);
      console.log('Document written with ID: ', email);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  //  process.env.FIREBASE_KEY
  // function to sign up user
  async function signUp() {
    if (pass1 == pass && email !== '') {
      setRegg('inp');
      await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          process.env.FIREBASE_KEY,
        {
          method: 'POST',
          headers: {
            contentType: 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.error == undefined) {
            createUserCollection();
            setTimeout(() => {
              setRegg('succ');
              this.textInput1.clear();
            }, 3000);
            //Navigate to login page
            setTimeout(() => {
              setEmail('');
              navigation.navigate('Login');
            }, 4500);
          } else {
            Alert.alert('Error Signing Up', data.error.message, [
              {
                text: 'OK',
              },
            ]);
            setRegg('');
          }
        })
        .catch(error => {
          console.log(error.message);
          Alert.alert('Error Signing Up', error.message, [
            {
              text: 'OK',
            },
          ]);
          setRegg('');
        });
    } else {
      Alert.alert('Form', 'Form is incomplete', [
        {
          text: 'Ok',
        },
      ]);
    }
  }

  return (
    <View style={styles.ReggMain}>
      <Text
        style={{
          borderRadius: 10,
          marginTop:20,
          fontSize:33,
          marginRight:130,
          color:"black"
        }}>
        Sign Up for
      </Text>
      <Text style={{
        marginBottom:30,
        marginRight:100,
        fontSize:20
      }}>
        Free and Instant books
      </Text>
      <KeyboardAvoidingView style={styles.ReggIn} behavior="padding">
        {/* Sign up inputs */}
        <TextInput
          style={styles.ReggTextIn}
          ref={input => {
            this.textInput1 = input;
          }}
          placeholder="    name"
          onChangeText={text => setNameid(text)}
        />
        <TextInput
          style={styles.ReggTextIn}
          ref={input => {
            this.textInput1 = input;
          }}
          inputMode="email"
          placeholder="    email"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          style={styles.ReggTextIn}
          placeholder="    password"
          autoCapitalize="none"
          onChangeText={text => setPass(text)}
        />
        <TextInput
          secureTextEntry
          style={styles.ReggTextIn}
          placeholder="    confirm password"
          autoCapitalize="none"
          onChangeText={text => setPass1(text)}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={styles.regCheckmain}
        keyboardShouldPersistTaps="always">
        <View style={styles.ReggButtonView}>
          <TouchableOpacity style={styles.loginButton} onPress={() => signUp()}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View>
          {regg === 'inp' ? (
            <>
              <Text>
                Signing you up... <ActivityIndicator color="#2407f2" />
              </Text>
            </>
          ) : regg === 'prob' ? (
            <>
              <Text>You have an account</Text>
            </>
          ) : regg === 'prob1' ? (
            <>
              <Text>A Network error occured</Text>
            </>
          ) : regg === 'prob2' ? (
            <Text>The form is not complete</Text>
          ) : regg === 'succ' ? (
            <>
              <Text>Sign Up Succesful ,Go to login Page!</Text>
            </>
          ) : (
            <>
              <Text>Buddy v.1.0</Text>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
