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
import React, {useState, useContext, useEffect, useRef} from 'react'; // Importing the useState hook from react
import axios from 'axios'; // Importing axios

import {createNativeStackNavigator} from '@react-navigation/native-stack'; // Importing the createNativeStackNavigator from @react-navigation/stack
import {NavigationContainer} from '@react-navigation/native'; // Importing the NavigationContainer from @react-navigation/native
import {userContext} from '../store/user';
import {useWindowDimensions} from 'react-native';
import DocumentRender from './DocumentRender';
import Icon from 'react-native-vector-icons/Ionicons';
import { addToHistory } from '../Screens/history';

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
  const {theme} = useContext(userContext);
  const ref = useRef();

  //Pdf regex http://207.211.176.165/buddy
  const test = /pdf/;

  const {width, height} = useWindowDimensions();

  // Get endpoints for getting pdfs from api
  async function getEndpoints(bookCode: string) {
    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setTitles([response.data['titles']]);
        setLoading(false);
        return;
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
      setLoading(false);
      console.log(endpoints);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setTitles(['An error occured']);
    }
    setLoading(false);
  }

  // Search for past questions
  const searchHandler = () => {
    if (code == '') {
      Alert.alert('Book Name Empty', 'Enter a book name to continue', [
        {
          text: 'Ok',
        },
      ]);
    } else {
      setComms('');
      this.textInput.clear();
      setCode('');
      setTitles([]);
      titlesCache = [];
      endpoints = [];
      images = [];
      setLoading(true);
      getEndpoints(code);
    }
  };

  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      if (titles[0] == 'Not found' || titles[0] == 'An error occured') {
        return;
      } else {
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
        backgroundColor: theme == 'dark' ? '#000' : '#fff',
      }}>
      <Text>{userComms}</Text>
      <View style={[styles.search,{borderColor:theme=="light"?"grey":"white"}]}>
        <TextInput
          ref={input => {
            this.textInput = input;
          }}
          style={{
            height: 40,
            width: 230,
            marginTop: 73,
            marginBottom: 30,
            padding: 10,
            color:theme=="light"?"#000":"#fff",
            backgroundColor:theme=="light"?"#fff":"#000",
          }}
          placeholder="       Enter book name"
          onChangeText={text => {
            setCode(text);
          }}></TextInput>
        <TouchableOpacity
          onPress={() => searchHandler()}
          style={styles.searchButton}>
          <Icon name="search-outline" size={32} color="#555" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.resultsCount,{backgroundColor:theme=="light"?"white":"black", color:theme=="light"?"black":"white"}]}>
        Results:
        {titles[0] == 'Not found' || titles[0] == 'An error occured'
          ? 0
          : titles.length}
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
                  backgroundColor: theme=="light"?"white":"black",
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
                    backgroundColor:theme=="light"?"white":"black",
                    borderRadius: 20,
                    flexDirection: 'column',
                    gap: 20,
                  }}>
                  {titles.map((title, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: width < 320 ? 160 : width < 400 ? 250 : 310,
                        height: 374,
                        backgroundColor: theme=="light"?"white":"black",
                        borderColor: theme=="light"?"black":"white",
                        elevation: 3,
                        borderWidth: 0.3,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        margin: 10,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        console.log(endpoints[i]);
                        context.setPdf(endpoints[i]);
                        setCurrentPdf(title);
                        addToHistory({name:title,endpoint:endpoints[i]})
                        navigationHandler();
                      }}>
                      <Image
                        source={{uri: images[i]}}
                        style={{
                          width: width < 320 ? 160 : width < 400 ? 250 : 310,
                          height: '75%',
                          borderRadius: 10,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          marginBottom: 50,
                          marginTop: -5,
                        }}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          color:theme=="light"?"black":"white"
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
  const {theme} = useContext(userContext)
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="DocumentSearch"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: theme=="light"?"#fff":"#000",
            },
            headerTintColor:theme=="light"?"#000":"#fff"
          }}
          component={DocumentSearch}
        />
        <Stack.Screen
          name="DocumentView"
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerStyle: {
                backgroundColor: theme=="light"?"#fff":"#000",
              },
              headerTintColor:theme=="light"?"#000":"#fff"
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
    borderBottomWidth: 1,
  },
  searchButton: {
    marginTop: 80,
  },
  resultsCount: {
    marginLeft: 200,
  },
});
