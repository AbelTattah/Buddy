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


const Stack = createStackNavigator();

var titlesCache: any[] = [];
var endpoints: any[] = [];
var images: any[] = [];
var first = true;

const Main = ({navigation}) => {
  const {name} = useContext(userContext);
  const [nameId, setName] = useState('');
  const [titles, setTitles] = useState<any[]>([]);
  const [loadingExplore, setLoadingExplore] = useState(false);
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
  const [genreIcon,setGenreIcon] = useState([
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
    <Icon name="chevron-forward" size={22} color="#999" />
  ])

  const context = useContext(userContext);

  // Get endpoints for getting pdfs from api
  async function fetchGenre(bookCode: string) {
    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setTitles([response.data['titles']]);
        setLoading(true);
        return;
      }
      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          endpoints.push(response.data.links[v]);
          titlesCache.push(response.data.titles[v]);
          imagesCache.push(response.data.images[v]);
        }
      }
      setTitles([titles, ...titlesCache]);
      setImages([images,...imagesCache]);
      setLoading(true);
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(true);
      console.log(error);
      setLoadingExplore(false);
      // fetchGenre(code);
      //setTitles(titles.push(['An error occured']));
    }
    setLoading(true);
    console.log(images)
  }

  // Search for past questions
  const changeGenre =  async (bookCode:string) => {

    setLoading(true);
    setLoadingExplore(true);

    if (titles[titles.length-1]=="An error occured") {
      titles.splice(titles.length-1,1)
    }

    titlesCache = []
    images = []
    setTitles([])
    setCurrentPdf("")

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setTitles(['An error occured']);
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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setTitles(['An error occured']);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(()=>{
     if (titles[titles.length-1]=="An error occured") {
        changeGenre(bookCode);
     } 
      },2000)
    }
  };

  const initialLoad = async(bookCode:string)=> {
    setLoading(true);
    setLoadingExplore(true);

    if (titles[titles.length-1]=="An error occured") {
      titles.splice(titles.length-1,1)
    }

    titlesCache = []
    images = []
    setTitles([])
    setCurrentPdf("")

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setTitles(['An error occured']);
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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setTitles(['An error occured']);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(()=>{
     if (titles[titles.length-1]=="An error occured") {
        initialLoad(bookCode);
     } 
      },2000)
    }
  }


  const update = async(bookCode:string) => {
    setLoading(true);
    setLoadingExplore(true);

    if (titles[titles.length-1]=="An error occured") {
      titles.splice(titles.length-1,1)
    }

    try {
      const response = await axios.post(
        'https://buddy-zpdh.onrender.com/geturl',
        {
          keywords: bookCode,
        },
      );
      if (response.data['titles'][0] == 'Not found') {
        setTitles(['An error occured']);
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
      setTimeout(() => setLoadingExplore(false), 4000);
    } catch (error) {
      setLoading(false);
      setTitles(['An error occured']);
      console.log(error);
      setLoadingExplore(false);
      setTimeout(()=>{
     if (titles[titles.length-1]=="An error occured") {
        update(bookCode);
     } 
      },2000)
    }
  }


  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      if (titles[0] == 'Not found' || titles[0] == 'An error occured') {
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
    initialLoad("literature")
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
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
                        changeGenre(item)
                      }}
                      genre={item}
                    />
                  </>
                );
              })}
            </ScrollView>
            <Text style={styles.sectionHeader}>Featured</Text>
            {loadingExplore ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <>
                <ScrollView
                  style={styles.featured} 
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {titles.map((title, i) => (
                    <BookCard
                      bookTitle={title}
                      explore={false}
                      image={images[i]}
                      func={() => {
                        console.log(endpoints[i]);
                        context.setPdf(endpoints[i]);
                        setCurrentPdf(title);
                        navigationHandler();
                      }}
                    />
                  ))}
                </ScrollView>
              </>
            )}
            <Text style={styles.sectionHeader}>Explore</Text>
            {/*Explore */}
            {loadingExplore ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <>
                {titles.map((title, i) => (
                  <BookCard
                    bookTitle={title}
                    explore={true}
                    func={() => {
                      console.log(endpoints[i]);
                      context.setPdf(endpoints[i]);
                      setCurrentPdf(title);
                      navigationHandler();
                    }}
                  />
                ))}
              </>
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
  featured: {
    gap: 10,
    height: 200,
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
    marginTop: 50,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
