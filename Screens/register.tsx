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
import {userContext} from '../store/user';
import {useContext} from 'react';
import { SaveInStorage } from './login';


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
  const context = useContext(userContext);


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
    if ( pass!=='' && email !== '') {
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
              SaveInStorage(data,nameid)
              setRegg('succ');
              context.setAuthState(true);
              context.setName(nameid);
              this.textInput1.clear();
            }, 3000);
            //Navigate to login page
            setTimeout(() => {
              setEmail('');
              navigation.navigate('App1');
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
      <View style={{
        width:"75%",
        justifyContent:'flex-start',
        flexDirection:'row'
      }}>
      <Text
        style={{
          borderRadius: 10,
          marginTop:20,
          fontSize:33,
          marginRight:130,
          fontWeight:"800",
          color:"black"
        }}>
        Sign Up for
      </Text>
      </View>
      <View style={{
        width:"75%",
        justifyContent:'flex-start',
        flexDirection:'row'
      }}>
      <Text style={{
        marginBottom:30,
        marginRight:100,
        fontSize:20,
        color:"black"
      }}>
        Free and Instant books
      </Text>
      </View>
      <KeyboardAvoidingView style={styles.ReggIn} behavior="padding">
        {/* Sign up inputs */}
        <TextInput
          style={[styles.ReggTextIn,{color:"black"}]}
          ref={input => {
            this.textInput1 = input;
          }}
          placeholder="    name"
          placeholderTextColor="black"
          onChangeText={text => setNameid(text)}
        />
        <TextInput
          style={[styles.ReggTextIn,{color:"black"}]}
          ref={input => {
            this.textInput1 = input;
          }}
          inputMode="email"
          placeholder="    email"
          autoCapitalize="none"
          placeholderTextColor="black"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry
          style={[styles.ReggTextIn,{color:"black"}]}
          placeholder="    password"
          autoCapitalize="none"
          placeholderTextColor="black"
          onChangeText={text => setPass(text)}
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
              <Text style={{color:"black"}}>
                Signing you up... <ActivityIndicator color="#2407f2" />
              </Text>
            </>
          ) : regg === 'prob' ? (
            <>
              <Text style={{color:"black"}}>You have an account</Text>
            </>
          ) : regg === 'prob1' ? (
            <>
              <Text style={{color:"black"}}>A Network error occured</Text>
            </>
          ) : regg === 'prob2' ? (
            <Text style={{color:"black"}}>The form is not complete</Text>
          ) : regg === 'succ' ? (
            <>
              <Text style={{color:"black"}}>Sign Up Succesful!</Text>
            </>
          ) : (
            <>
              <Text style={{color:"black"}}>Buddy v.1.0</Text>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
