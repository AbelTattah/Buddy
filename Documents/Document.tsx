import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native'; // Importing components from react-native
import React, {useState, useContext, useEffect,useRef} from 'react'; // Importing the useState hook from react
import axios from 'axios'; // Importing axios

import {createNativeStackNavigator} from '@react-navigation/native-stack'; // Importing the createNativeStackNavigator from @react-navigation/stack
import {NavigationContainer} from '@react-navigation/native'; // Importing the NavigationContainer from @react-navigation/native
import {userContext} from '../store/user';
import { useWindowDimensions} from 'react-native';
import DocumentRender from './DocumentRender';

/*
TODO: 

3. Previous Searches
1. Book Persistence
2. Previous Books
*/

const Stack = createNativeStackNavigator();

var titlesCache: any[] = [];
var endpoints: any[] = [];
var images: any[] = [];

// Load fonts
const DocumentSearch = ({navigation}: any) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<any[]>([]);
  const [currentPdf, setCurrentPdf] = useState<string>('');
  const [userComms, setComms] = useState<string>('');

  const context = useContext(userContext);
  const ref = useRef();
  
  //Pdf regex http://207.211.176.165/buddy
  const test = /pdf/;

  const {width, height} = useWindowDimensions();

  // Get endpoints for getting pdfs from api
  async function getEndpoints(bookCode: string) {
    try {
      const response = await axios.post('https://buddy-zpdh.onrender.com/geturl', {
        keywords: bookCode,
      });
      if (response.data["titles"][0]=="Not found") {
        setTitles([response.data["titles"]])
        setLoading(false)
        return
      }
      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          endpoints.push(response.data.links[v]);
          titlesCache.push(response.data.titles[v]);
          images.push(response.data.images[v]);
        }
      }
      setTitles(titlesCache);
      setLoading(false)
      console.log(endpoints)
    } catch (error) {
      setLoading(false);
      console.log(error)
      setTitles(['An error occured']);
    }
    setLoading(false);
  }

  // Search for past questions
  const searchHandler = () => {
    if (code=="") {
      Alert.alert('Book Name Empty',"Enter a book name to continue",[
        {
          text:'Ok'
        }
      ])
    }
    else {
      setComms("")
      this.textInput.clear()
      setCode("")
      setTitles([]);
      titlesCache=[]
      endpoints=[]
      setLoading(true);
      getEndpoints(code);
    }
  };

  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      if (titles[0] == 'Not found' || titles[0] == 'An error occured') {
        return
      }
      else {
        navigation.navigate('DocumentView', {
          book: currentPdf,
        });
      }
    }, 1000);
  };


  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor: '#fff',
      }}>
      <Text>{userComms}</Text>
      <View style={styles.search}>
        <TextInput
          ref={(input) => {
            this.textInput = input;
          }}
          style={{
            height: 40,
            width: 230,
            marginTop: 73,
            marginBottom: 30,
            padding: 10,
            color: 'black',
          }}
          placeholder="       Enter book name"
          onChangeText={text => {
            setCode(text);
          }}></TextInput>
        <TouchableOpacity
          onPress={() => searchHandler()}
          style={styles.searchButton}>
          <Image
            source={require('../assets/search.png')}
            style={{
              width: 28,
              height: 28,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.resultsCount}>
        Results:{titles[0] == 'Not found'|| titles[0]=='An error occured' ? 0 : titles.length}
      </Text>
      <View>
        <View
          style={{
            height: height < 550 ? 340 : height < 750 ? 420 : 540,
            width: width < 320 ? 200 : width < 400 ? 300 : 350,
            marginBottom: 230,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  padding: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <>
                <ScrollView
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    flexDirection: 'column',
                    gap: 20,
                  }}>
                  {titles.map((title, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: width < 320 ? 160 : width < 400 ? 250 : 310,
                        height: 386,
                        backgroundColor: '#eee',
                        borderColor: '#00f',
                        elevation: 3,
                        borderWidth: 0.3,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems:"center",
                        margin: 10,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        console.log(endpoints[i]);
                        context.setPdf(endpoints[i]);
                        setCurrentPdf(title);
                        navigationHandler();
                      }}>
                      <Image
                        source={{uri: images[i]}}
                        style={{
                          width: 250,
                          height: 260,
                          borderRadius: 10,
                          marginLeft: 10,
                          marginBottom:20
                        }}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                        }}>
                        {title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}
          </>
        </View>
      </View>
    </View>
  );
};

const DocumentNav = ({navigation}) => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="DocumentSearch"
          options={{
            headerShown: false
          }}
          component={DocumentSearch}
        />
        <Stack.Screen
          name="DocumentView"
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
            };
          }}
          component={DocumentRender}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DocumentNav;

/*
map((item:any,index:any)=>{
        console.log(test.test(item))
        if(test.test(item)) {
          return item
        }
      });
*/

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    width: 300,
    height: 120,
    marginBottom: 20,
    marginTop: -2,
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  searchButton: {
    marginTop: 80,
  },
  resultsCount: {
    marginLeft: 200,
  },
});
