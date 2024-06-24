import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import {useEffect, useState} from 'react';
import React, {useContext} from 'react';
import Colors from '../colors/colors';
import {userContext} from '../store/user';
import GenreCard from '../Components/genreCard';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DocumentNav from '../Documents/Document';
import DocumentRenderer from '../Documents/DocumentRender';
import axios from 'axios';
import BookCard from '../Components/bookCard';

const Stack = createStackNavigator();

var titlesCache: any[] = [];
var endpoints: any[] = [];

const Main = ({navigation}) => {
  const {name} = useContext(userContext);
  const [nameId, setName] = useState('');
  const [titles, setTitles] = useState<any[]>([]);
  const [currentPdf, setCurrentPdf] = useState<string>('');
  const [code, setCode] = useState('');
  var first = true

  //Responsiveness
  const {width, height} = useWindowDimensions();


  //Pdf regex http://207.211.176.165/buddy
  const test = /pdf/;


  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([
    'Art',
    'Science',
    'Mathematics',
    'Literature',
    'History',
    'Technology',
    'Music',
    'Dance',
    'Sports',
    'Cooking',
    'Gardening',
    'Crafts',
    'DIY',
  ]);


  const context = useContext(userContext);

  // Get endpoints for getting pdfs from api
  async function fetchGenre(bookCode: string) {
    try {
      const response = await axios.post('https://buddy-zpdh.onrender.com/geturl', {
        keywords: bookCode,
      });
      if (response.data["titles"][0]=="Not found") {
        setTitles([response.data["titles"]])
        setLoading(true)
        return
      }
      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          endpoints.push(response.data.links[v]);
          titlesCache.push(response.data.titles[v]);
        }
      }
      setTitles(titlesCache);
        setLoading(true)
      console.log(endpoints)
    } catch (error) {
      setLoading(true);
      console.log(error)
      setTitles(['An error occured']);
    }
    setLoading(true);
  }

  // Search for past questions
  const searchHandler = () => {
      setCode(genre[4])
      if (first!==false) {
      setLoading(false);
      }
      fetchGenre(code);
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


  useEffect(() => {
    setName(name);
    searchHandler()
    setTimeout(()=>{
      first = false
    },2000)
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={()=>{
        searchHandler()
      }} style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topCard}>
            <Text style={styles.greeting}>Hello, {nameId}!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              style={styles.profilePic}
              source={require('../assets/search.png')}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <>
            <Text style={styles.sectionHeader}>Genre</Text>
            <View style={styles.search}>
              <ScrollView style={styles.genres} horizontal={true}>
                {genre.map((item, i) => {
                  return (
                    <>
                          <GenreCard search={()=>{
                        console.log("Hello")
                          setCode(item)
                          setTitles([])
                          endpoints = []
                          titlesCache = []
                          searchHandler()
                      }}  genre={item} />
                    </>
                    );
                })}
              </ScrollView>
            </View>
            <Text style={styles.sectionHeader}>Featured</Text>
            <Text style={styles.sectionHeader}>Explore</Text>
            {/*Explore */}
            {titles.map((title, i) => (
                      <BookCard 
                        bookTitle = {title}
                        explore = {true}

                        func={() => {
                          console.log(endpoints[i]);
                          context.setPdf(endpoints[i]);
                          setCurrentPdf(title);
                          navigationHandler();
                      }} />
                  ))}
          </>
        ) : (
          <ActivityIndicator color={'#666'} size={40} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Home = ({navigation}) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Search" component={DocumentNav} />
        <Stack.Screen name="View" component={DocumentRenderer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: '90%',
    height: '100%',
    paddingTop: 13,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  topCard: {
    width: '60%',
  },
  profilePic: {
    width: 30,
    height: 32,
  },
  filter: {
    height: 50,
    width: 48,
  },
  genres: {
    gap: 10,
    height: 60,
  },
  greeting: {
    fontSize: 28,
    color: 'black',
    fontWeight: '400',
  },
  greetingInfo: {
    color: 'black',
    fontSize: 14,
  },
  categories: {
    height: 220,
    gap: 10,
    marginBottom: 30,
    marginTop: 13,
  },
  tasks: {
    flex: 1,
    gap: 10,
    marginTop: 10,
    height: 280,
  },
  search: {
    height: '10%',
    paddingTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    paddingLeft: 15,
    borderWidth: 0.167,
    borderStyle: 'solid',
    borderColor: '#888',
  },
  sectionHeader: {
    fontSize: 20,
    marginTop: 50,
    color: 'black',
    fontWeight: 'bold',
  },
});
