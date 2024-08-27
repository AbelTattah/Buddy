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
import {addToHistory} from '../Screens/history';
import PrimarySearch from '../Components/primarySearch';
import Detail from '../Screens/home/detail';
import {set} from 'firebase/database';
import Colors from '../Components/constants/Colors';

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
  const [noReslts, setNoResults] = useState(false);

  const context = useContext(userContext);
  const {theme, url, setUrl} = useContext(userContext);
  const ref = useRef();

  const [placeholder, setPlaceholder] = useState('Enter book name');
  const [placeholderColor, setPlaceholderColor] = useState('grey');

  const [error, setError] = useState(false);

  //Pdf regex http://207.211.176.165/buddy
  const test = /pdf/;

  const {width, height} = useWindowDimensions();

  // Get endpoints for getting pdfs from api
  async function getEndpoints(bookCode: string) {
    setNoResults(false);
    setError(false);
    try {
      const response = await axios.post(
        'https://com.buddyyy.duckdns.org/geturl',
        {
          keywords: bookCode,
        },
      );
      if (!response.data['titles'][0]) {
        setNoResults(true);
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
      setError(true);
    }
    setLoading(false);
  }

  // Search for past questions
  const searchHandler = () => {
    setPlaceholder('Enter book name');
    setPlaceholderColor('grey');
    if (code == '') {
      setPlaceholder('Please enter a book name');
      setPlaceholderColor('red');
      return;
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        backgroundColor:
          theme == 'dark' ? Colors.primary100 : Colors.primary200,
      }}>
      <Text>{userComms}</Text>
      <PrimarySearch
        handleSearch={searchHandler}
        textInput={
          <TextInput
            ref={input => {
              this.textInput = input;
            }}
            onSubmitEditing={() => {
              searchHandler();
            }}
            style={{
              height: '100%',
              width: '80%',
              padding: 10,
              color: theme == 'light' ? Colors.primary100 : Colors.primary200,
              backgroundColor:
                theme == 'light' ? Colors.primary200 : Colors.primary100,
            }}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            onChangeText={text => {
              setCode(text);
            }}></TextInput>
        }
      />
      <Text
        style={[
          styles.resultsCount,
          {
            backgroundColor:
              theme == 'light' ? Colors.primary200 : Colors.primary100,
            color: theme == 'light' ? Colors.primary100 : Colors.primary200,
          },
        ]}>
        Results:
        {noReslts ? 'No results found' : titles.length}
      </Text>
      <View
        style={{
          height: '80%',
          width: width < 320 ? 200 : width < 400 ? 300 : 350,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <>
          {noReslts ? (
            <Text
              style={{
                color: theme == 'light' ? Colors.primary100 : Colors.primary200,
                marginTop: 100,
              }}>
              No results found... Enter a different Search Keyword.
            </Text>
          ) : null}
        </>
        <>
          {error && <Text style={{color: 'red'}}>An error occured</Text>}
          {loading ? (
            <View
              style={{
                flex: 1,
                backgroundColor:
                  theme == 'light' ? Colors.primary200 : Colors.primary100,
                borderRadius: 20,
                padding: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
              <Text>Searching for book...</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor:
                  theme == 'light' ? Colors.primary200 : Colors.primary100,
                borderRadius: 20,
                flexDirection: 'column',
                gap: 20,
              }}>
              <ScrollView>
                {titles.map((title, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      width: width < 320 ? 160 : width < 400 ? 250 : 310,
                      height: 'auto',
                      maxHeight: 500,
                      backgroundColor:
                        theme == 'light'
                          ? Colors.primary200
                          : Colors.primary100,
                      borderColor:
                        theme == 'light'
                          ? Colors.primary100
                          : Colors.primary200,
                      elevation: 3,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      margin: 10,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      console.log(endpoints[i]);
                      // context.setPdf(endpoints[i]);
                      // setCurrentPdf(title);
                      // addToHistory({name:title,endpoint:endpoints[i]})
                      // navigationHandler();
                      setUrl(endpoints[i]);
                      navigation.navigate('Detail', {
                        name: title,
                        image: images[i],
                        url: endpoints[i],
                      });
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
                        width: '90%',
                        color:
                          theme == 'light'
                            ? Colors.primary100
                            : Colors.primary200,
                      }}>
                      {title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      </View>
    </View>
  );
};

const DocumentNav = ({navigation}) => {
  const {theme} = useContext(userContext);
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor:
                theme == 'light' ? Colors.primary200 : Colors.primary100,
            },
            headerTintColor:
              theme == 'light' ? Colors.primary100 : Colors.primary200,
          }}
          component={DocumentSearch}
        />
        <Stack.Screen
          name="View"
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerShown: false,
          }}}
          component={DocumentRender}
        />
        <Stack.Screen
          name="Detail"
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerShown: false,
            };
          }}
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DocumentNav;

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    width: 300,
    height: 125,
    marginBottom: 20,
    position: 'absolute',
    top: -50,
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
