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

const Stack = createStackNavigator();
var images: any[] = [];
var featuredImages: any[] = [];

const Main = ({navigation}) => {
  const {name} = useContext(userContext);
  const [nameId, setName] = useState('');
  const [book, setBook] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [loadingExplore, setLoadingExplore] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [currentPdf, setCurrentPdf] = useState<string>('');
  const [code, setCode] = useState('');

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
      setLoadingFeatured(true);
      setFeatured([]);
      featuredImages = [];

      try {
        const response = await axios.post(
          'https://buddy-zpdh.onrender.com/geturl',
          {
            keywords: bookCode,
          },
        );
        if (response.data['titles'][0] == 'Not found') {
          setFeatured([
            {
              endpoint: 'An error occured',
              title: 'An error occured',
              image: 'none',
            },
          ]);
          return;
        }
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
        setTimeout(() => setLoadingFeatured(false), 4000);
      } catch (error) {
        setFeatured([
          {
            endpoint: 'An error occured',
            title: 'An error occured',
            image: 'none',
          },
        ]);
        console.log(error);
        setLoadingFeatured(false);
        setTimeout(() => {
          if (featured[featured.length - 1]['title'] == 'An error occured') {
            setFeatured(book=>[...book.splice(featured.length - 1, 1)]);
            changeGenre(bookCode, isfeatured);
          }
        }, 2000);
      }
      return;
    }

    setLoading(true);
    setLoadingExplore(true);
    setBook([]);
    images = [];

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setBook([
          {
            endpoint: 'An error occured',
            title: 'An error occured',
            image: 'none',
            loading: false,
          },
        ]);
        return;
      }
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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setBook([
        {
          endpoint: 'An error occured',
          title: 'An error occured',
          image: 'none',
          loading: false,
        },
      ]);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(() => {
        if (book[book.length - 1]['title'] == 'An error occured') {
          setBook(book=>[...book.splice(book.length - 1, 1)]);
          changeGenre(bookCode, isfeatured);
        }
      }, 2000);
    }
  };

  const initialLoad = async (bookCode: string, isfeatured: boolean) => {
    if (isfeatured) {
      setLoadingFeatured(true);
      try {
        const response = await axios.post(
          'https://buddy-zpdh.onrender.com/geturl',
          {
            keywords: bookCode,
          },
        );
        if (response.data['titles'][0] == 'Not found') {
          setFeatured([
            {
              endpoint: 'An error occured',
              title: 'An error occured',
              image: 'none',
            },
          ]);
          return;
        }
        // Filter pdf endpoints
        for (var v = 0; v < response.data.links.length; v++) {
          if (test.test(response.data.links[v])) {
            featuredImages.push(response.data.images[v]);
            setFeatured(book => [
              ...book,
              {
                endpoint: response.data.links[v],
                title: response.data.titles[v],
              },
            ]);
          }
        }
        setTimeout(() => setLoadingFeatured(false), 4000);
      } catch (error) {
        setFeatured([
          {
            endpoint: 'An error occured',
            title: 'An error occured',
            image: 'none',
          },
        ]);
        console.log(error);
        setLoadingFeatured(false);
        setTimeout(() => {
          if (featured[featured.length - 1]['title'] == 'An error occured') {
            changeGenre(bookCode, isfeatured);
          }
        }, 2000);
      }
      return;
    }

    setLoading(true);
    setLoadingExplore(true);

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setBook([
          {
            endpoint: 'An error occured',
            title: 'An error occured',
            image: 'none',
            loading: false,
          },
        ]);
        return;
      }
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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setBook([
        {
          endpoint: 'An error occured',
          title: 'An error occured',
          image: 'none',
          loading: false,
        },
      ]);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(() => {
        if (book[book.length - 1]['title'] == 'An error occured') {
          setBook(book=>[...book.splice(book.length - 1, 1)]);
          initialLoad(bookCode, isfeatured);
        }
      }, 2000);
    }
  };

  const update = async (bookCode: string, isfeatured: boolean) => {
    if (book[book.length - 1]['title'] == 'An error occured') {
      book.splice(book.length - 1, 1);
    }

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setBook([
          {
            endpoint: 'An error occured',
            title: 'An error occured',
            image: 'none',
            loading: false,
          },
        ]);
        return;
      }

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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setBook(book=>[...book,
        {
          endpoint: 'An error occured',
          title: 'An error occured',
          image: 'none',
          loading: false,
        },
      ]);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(() => {
        if (book[book.length - 1]['title'] == 'An error occured') {
          setBook(book=>[...book.splice(book.length - 1, 1)]);
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
    setName(name);
    initialLoad('Science', false);
    initialLoad('literature', true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        onScroll={e => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            let random = Math.floor(Math.random() * (12));
            console.log('Random number:', random);
            update(genre[random], false);
          }
        }}
        showsVerticalScrollIndicator={false}
        style={styles.main}>
        <View style={styles.header}>
          <View style={styles.topCard}>
            <Text style={styles.greeting}>Hello, {nameId}!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search-outline" size={32} color="#555" />
          </TouchableOpacity>
        </View>
        {loading == false ? (
          <>
            <Text style={styles.sectionHeader}>Genre</Text>
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
                        changeGenre(item, false);
                        changeGenre(item, true);
                      }}
                      genre={item}
                    />
                  </>
                );
              })}
            </ScrollView>
            <Text style={styles.sectionHeader}>Featured</Text>
            {loadingFeatured ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <>
                {/* <ScrollView
                  style={styles.featured} 
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {featured.map((featured,i) => (
                    <TouchableOpacity
                    style={{
                      flexDirection:"column"
                    }}
                    onPress={
                      ()=> {
                        context.setPdf(featured["endpoint"]);
                        setCurrentPdf(featured["title"]);
                        navigationHandler();
                      }
                    }
                    >
                    <Image style={styles.profilePic1} source={{uri:featuredImages[i]?featuredImages[i]:"none"}} />
                    <BookCard
                      bookTitle={featured["title"]}
                      explore={false}
                      image={featured["image"]}
                      func={() => {
                        console.log(featuredImages[i])
                      }}
                    />
                    </TouchableOpacity>
                  ))}
                </ScrollView> */}
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
              </>
            )}
            <Text style={styles.sectionHeader}>Explore</Text>
            {/*Explore */}
            {loadingExplore ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              // <>
              //   {book.map((book, i) => (
              //     <>
              //       <TouchableOpacity
              //         onPress={() => {
              //           context.setPdf(book['endpoint']);
              //           setCurrentPdf(book['title']);
              //           navigationHandler();
              //         }}>
              //         <Image
              //           style={styles.profilePic}
              //           source={{uri: images[i] ? images[i] : 'none'}}
              //         />
              //         <BookCard
              //           key={i}
              //           bookTitle={book['title']}
              //           explore={true}
              //           image={book['image']}
              //           func={() => {}}
              //         />
              //       </TouchableOpacity>
              //     </>
              //   ))}
              // </>
              <FlatList
                data={book}
                keyExtractor={item => item.title}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        context.setPdf(item['endpoint']);
                        setCurrentPdf(item['title']);
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
  sectionHeader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
