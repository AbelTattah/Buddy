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
  useWindowDimensions,
  Button,
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
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import {addToHistory} from './history';
import {set} from 'firebase/database';

const Stack = createStackNavigator();
var images: any[] = [];
var featuredImages: any[] = [];

const Main = ({navigation}) => {
  const {name, theme} = useContext(userContext);
  const [nameId, setName] = useState('');
  const [book, setBook] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [loadingExplore, setLoadingExplore] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [currentPdf, setCurrentPdf] = useState<string>('');
  const [limit, setLimit] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [errorExplore, setErrorExplore] = useState(false);
  const [errorFeatured, setErrorFeatured] = useState(false);

  //Responsiveness
  const {width, height} = useWindowDimensions();

  //Pdf regex http://207.211.176.165/buddy
  const test = /pdf/;
  var count = 0;

  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([
    'AI',
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
  const [genreIcon, setGenreIcon] = useState([
    <Icon name="brush-outline" size={22} color="#999" />,
    <Icon name="flask-outline" size={22} color="#999" />,
    <Icon name="pencil-outline" size={22} color="#999" />,
    <Icon name="pencil-outline" size={22} color="#999" />,
    <Icon name="time-outline" size={22} color="#999" />,
    <Icon name="settings-outline" size={22} color="#999" />,
    <Icon name="guitar-outline" size={22} color="#999" />,
    <Icon name="footbal-outline" size={22} color="#999" />,
    <Icon name="burger-outline" size={22} color="#999" />,
    <Icon name="chevron-forward" size={22} color="#999" />,
    <Icon name="chevron-forward" size={22} color="#999" />,
    <Icon name="chevron-forward" size={22} color="#999" />,
    <Icon name="chevron-forward" size={22} color="#999" />,
  ]);

  const context = useContext(userContext);

  const changeGenre = async (bookCode: string, isfeatured: boolean) => {
    if (isfeatured) {
      setErrorFeatured(false);
      setLoadingFeatured(true);
      setFeatured([]);
      featuredImages = [];

      try {
        const response = await axios.post(
          'https://com.buddyyy.duckdns.org/geturl',
          {
            keywords: bookCode,
          },
        );

        // Filter pdf endpoints
        for (var v = 0; v < response.data.links.length; v++) {
          if (test.test(response.data.links[v])) {
            images.push(response.data.images[v]);
            setFeatured(book => [
              ...book,
              {
                endpoint: response.data.links[v],
                title: response.data.titles[v],
              },
            ]);
          }
        }
        count = 0;
        setTimeout(() => setLoadingFeatured(false), 4000);
      } catch (error) {
        console.log(error);
        setErrorFeatured(true);
        setLoadingFeatured(false);
        setTimeout(() => {
          if (errorFeatured && count < 2) {
            changeGenre(bookCode, isfeatured);
          }
        }, 2000);
      }
      return;
    }

    setErrorExplore(false);
    setLoading(true);
    setLoadingExplore(true);
    setBook([]);
    images = [];

    try {
      const response = await axios.post(
        'https://com.buddyyy.duckdns.org/geturl',
        {
          keywords: bookCode,
        },
      );

      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          images.push(response.data.images[v]);
          setBook(book => [
            ...book,
            {
              endpoint: response.data.links[v],
              title: response.data.titles[v],
              loading: false,
            },
          ]);
        }
      }
      count = 0;
      setLoading(false);
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setErrorExplore(true);
      setLoadingExplore(false);
      setTimeout(() => {
        count++;
        if (errorExplore && count < 2) {
          changeGenre(bookCode, isfeatured);
        }
      }, 2000);
    }
  };

  const initialLoad = async (bookCode: string, isfeatured: boolean) => {
    if (isfeatured) {
      setFeatured([]);
      setLoading(true);
      featuredImages = [];
      setErrorFeatured(false);
      setLoadingFeatured(true);
      try {
        const response = await axios.post(
          'https://com.buddyyy.duckdns.org/geturl',
          {
            keywords: bookCode,
          },
        );

        // Filter pdf endpoints
        for (var v = 0; v < response.data.links.length; v++) {
          if (test.test(response.data.links[v])) {
            featuredImages.push(response.data.images[v]);
            setFeatured(featured => [
              ...featured,
              {
                endpoint: response.data.links[v],
                title: response.data.titles[v],
              },
            ]);
          }
        }
        count = 0;
        setTimeout(() => setLoadingFeatured(false), 4000);
      } catch (error) {
        setErrorFeatured(true);
        console.log(error);
        setLoadingFeatured(false);
        setTimeout(() => {
          count++;
          if (errorFeatured && count < 2) {
            changeGenre(bookCode, isfeatured);
          }
        }, 2000);
      }
      return;
    }

    setBook([]);
    images = [];
    setErrorExplore(false);
    setLoading(true);
    setLoadingExplore(true);

    try {
      const response = await axios.post(
        'https://com.buddyyy.duckdns.org/geturl',
        {
          keywords: bookCode,
        },
      );

      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          images.push(response.data.images[v]);
          setBook(book => [
            ...book,
            {
              endpoint: response.data.links[v],
              title: response.data.titles[v],
              loading: false,
            },
          ]);
        }
      }
      setLoading(false);
      count = 0;
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setErrorExplore(true);
      setLoading(false);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(() => {
        count++;
        if (errorExplore && count < 2) {
          initialLoad(bookCode, isfeatured);
        }
      }, 2000);
    }
  };

  const update = async (bookCode: string, isfeatured: boolean) => {
    setErrorExplore(false);
    setUpdating(true);
    try {
      const response = await axios.post(
        'https://com.buddyyy.duckdns.org/geturl',
        {
          keywords: bookCode,
        },
      );

      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          images.push(response.data.images[v]);
          setBook(book => [
            ...book,
            {
              endpoint: response.data.links[v],
              title: response.data.titles[v],
              loading: false,
            },
          ]);
        }
      }

      setLoading(false);
      count = 0;
      setTimeout(() => setUpdating(false), 2000);
    } catch (error) {
      setErrorExplore(true);
      setLoading(false);

      console.log(error);
      setLoadingExplore(false);
      setTimeout(() => setUpdating(false), 2000);
      setTimeout(() => {
        if (errorExplore && count > 2) {
          update(bookCode, isfeatured);
        }
      }, 2000);
    }
  };

  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      if (
        book[0]['title'] == 'Not found' ||
        book[0]['title'] == 'An error occured'
      ) {
        return;
      } else {
        navigation.navigate('View', {
          book: currentPdf,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    let random = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
    setName(name);
    initialLoad(genre[random], false);
    initialLoad(genre[random2], true);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme == 'light' ? 'white' : 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        onScroll={e => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            let random = Math.floor(Math.random() * 12);
            console.log('Random number:', random);
            if (book.length>40) {
              setLimit(true)
            }
            if (limit===false) {
              update(genre[random], false);
            } 
          }
        }}
        showsVerticalScrollIndicator={false}
        style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topCard}>
            <Text
              style={{
                fontSize: 28,
                color: theme == 'light' ? 'black' : 'white',
                fontWeight: '400',
              }}>
              Hello, {nameId}!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              let random = Math.floor(Math.random() * 6);
              let random2 = Math.floor(Math.random() * 12);
              setLimit(false)
              setName(name);
              initialLoad(genre[random], false);
              initialLoad(genre[random2], true);
            }}>
            <Icon
              name="refresh-outline"
              size={32}
              color={theme == 'light' ? '#555' : '#eee'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon
              name="search-outline"
              size={32}
              color={theme == 'light' ? '#555' : '#eee'}
            />
          </TouchableOpacity>
        </View>
        {loading == false ? (
          <>
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                marginBottom: 20,
                color: theme == 'light' ? 'black' : 'white',
                fontWeight: 'bold',
              }}>
              Genre
            </Text>
            <ScrollView
              style={styles.genres}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {genre.map((item, i) => {
                return (
                  <>
                    <GenreCard
                      Icon={genreIcon[i]}
                      search={() => {
                        setLimit(false);
                        changeGenre(item, false);
                        changeGenre(item, true);
                      }}
                      genre={item}
                    />
                  </>
                );
              })}
            </ScrollView>
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                marginBottom: 20,
                color: theme == 'light' ? 'black' : 'white',
                fontWeight: 'bold',
              }}>
              Featured
            </Text>
            {loadingFeatured ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <>
                <FlatList
                  data={featured}
                  keyExtractor={item => item.title}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'column',
                        }}
                        onPress={() => {
                          context.setPdf(item['endpoint']);
                          setCurrentPdf(item['title']);
                          addToHistory({
                            name: item['title'],
                            endpoint: item['endpoint'],
                          });
                          navigationHandler();
                        }}>
                        <Image
                          style={styles.profilePic1}
                          source={{
                            uri: featuredImages[index]
                              ? featuredImages[index]
                              : 'none',
                          }}
                        />
                        <BookCard
                          bookTitle={item['title']}
                          explore={false}
                          image={item['image']}
                          func={() => {
                            console.log(featuredImages[i]);
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
                {errorFeatured && <Text>An error occured...</Text>}
                {errorFeatured && (
                  <TouchableOpacity
                    onPress={() => {
                      let random = Math.floor(Math.random() * 6);
                      let random2 = Math.floor(Math.random() * 12);
                      setName(name);
                      initialLoad(genre[random], false);
                      initialLoad(genre[random2], true);
                    }}>
                    <Text>Tap to reload</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
            <Text
              style={{
                fontSize: 20,
                marginTop: 10,
                marginBottom: 20,
                color: theme == 'light' ? 'black' : 'white',
                fontWeight: 'bold',
              }}>
              Explore
            </Text>
            {/*Explore */}
            {loadingExplore ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <FlatList
                data={book}
                keyExtractor={item => item.title}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        context.setPdf(item['endpoint']);
                        setCurrentPdf(item['title']);
                        addToHistory({
                          name: item['title'],
                          endpoint: item['endpoint'],
                        });
                        navigationHandler();
                      }}>
                      <Image
                        style={styles.profilePic}
                        source={{uri: images[index] ? images[index] : 'none'}}
                      />
                      <BookCard
                        bookTitle={item['title']}
                        explore={true}
                        image={item['image']}
                        func={() => {}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
            {errorExplore && <Text>An error occured...</Text>}
            {errorExplore && (
              <TouchableOpacity
                onPress={() => {
                  let random = Math.floor(Math.random() * 6);
                  let random2 = Math.floor(Math.random() * 12);
                  setName(name);
                  initialLoad(genre[random2], false);
                }}>
                <Text>Tap to reload</Text>
              </TouchableOpacity>
            )}
            <>{updating && <ActivityIndicator style={{marginBottom:20}} color={'#666'} size={40} />}</>
            <>{limit?(<Text style ={{marginBottom:20}}> You're all caught up for today. Click the refresh button to seen more</Text>):(<></>)}</>
          </>
        ) : (
          <View
          style={{
            flex:1,
            height:'100%',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            margin:100
          }}
          >
          <ActivityIndicator color={'#666'} size={40} />
          <Text>Loading Books...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Home = ({navigation}) => {
  const {theme} = useContext(userContext);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="Search" 
        component={DocumentNav} 
        options={({route}) => {
          return {
            headerStyle: {
              backgroundColor: theme == 'light' ? '#fff' : '#000',
            },
            headerTintColor: theme == 'light' ? '#000' : '#fff',
          };
        }}
        />
        <Stack.Screen
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerStyle: {
                backgroundColor: theme == 'light' ? '#fff' : '#000',
              },
              headerTintColor: theme == 'light' ? '#000' : '#fff',
            };
          }}
          name="View"
          component={DocumentRenderer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: '100%',
    height: 370,
    marginBottom: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  profilePic1: {
    width: 160,
    height: 170,
    marginBottom: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
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
  filter: {
    height: 50,
    width: 48,
  },
  genres: {
    gap: 10,
    height: 60,
  },
  featured: {
    gap: 10,
    height: 250,
    marginBottom: 15,
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
    marginBottom: 10,
    marginTop: 13,
  },
  tasks: {
    flex: 1,
    gap: 10,
    marginTop: 10,
    height: 280,
  },
  search: {
    height: 100,
    paddingTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
