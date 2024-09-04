import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import React, {useContext} from 'react';
import Colors from '../Components/constants/Colors';
import {userContext} from '../store/user';
import GenreCard from '../Components/genreCard';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DocumentNav from '../Documents/Document';
import DocumentRenderer from '../Documents/DocumentRender';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import Detail from './home/detail';
import PrimaryInfoCard from '../Components/primaryInfoCard';
import { bookSearch } from '../Utils/bookSearch';

const Stack = createStackNavigator();

// Main Home Component
const Main = ({navigation}:any) => {
  const {theme} = useContext(userContext);
  const [book, setBook] = useState<{featured:[];explore:[]}>({
    featured:[],
    explore:[]
  });
  const [loadingExplore, setLoadingExplore] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [limit, setLimit] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [errorExplore, setErrorExplore] = useState(false);
  const [errorFeatured, setErrorFeatured] = useState(false);

  //Responsiveness
  //const {width, height} = useWindowDimensions();

  
  var count = 0;

  const [loading, setLoading] = useState(true);

  const {setUrl} = useContext(userContext);


  const  LoadBook = useCallback (()=>{
  async (bookCode: string, isfeatured: boolean) => {

  };
 },[])



  useEffect(() => {
    let random = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * (12 - 6 + 1)) + 6;
    LoadBook(Genres[random], false);
    LoadBook(Genres[random2], true);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          theme == 'light' ? Colors.primary200 : Colors.primary100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: Colors.primary300,
          },
        ]}>
        <View style={styles.topCard}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text
          style={{
            fontSize: 20,
            position: 'absolute',
            left: '50%',
            transform: [{translateX: -12}],
            fontWeight: 'bold',
            color: theme == 'light' ? Colors.primary200 : Colors.primary100,
          }}>
          Buddy
        </Text>
        <Icon
          onPress={() => navigation.navigate('Search')}
          name="search-outline"
          size={32}
          color={theme == 'light' ? Colors.primary200 : Colors.primary100}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              let random = Math.floor(Math.random() * 6);
              let random2 = Math.floor(Math.random() * 12);
              setLimit(false);
              initialLoad(Genres[random], false);
              initialLoad(Genres[random2], true);
              setRefreshing(false);
            }}
          />
        }
        onScroll={e => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            let random = Math.floor(Math.random() * 12);
            console.log('Random number:', random);
            if (book.length > 40) {
              setLimit(true);
            }

          }
        }}
        showsVerticalScrollIndicator={false}
        style={styles.main}>
        {loading == false ? (
          <>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                color: theme == 'light' ? Colors.primary100 : Colors.primary200,
                fontWeight: 'bold',
              }}>
              Genre
            </Text>
            <ScrollView
              style={styles.genres}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {Genres.map((item, i) => {
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
                color: theme == 'light' ? Colors.primary100 : Colors.primary200,
                fontWeight: 'bold',
              }}>
              Hot
            </Text>
            {loadingFeatured ? (
              <ActivityIndicator color={'#666'} size={40} />
            ) : (
              <>
                <FlatList
                  data={featured}
                  keyExtractor={item => item.title}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={{height: 20, width: 20}} />
                  )}
                  renderItem={({item, index}) => {
                    return (
                      <PrimaryInfoCard
                        name={''}
                        type="any"
                        date={item['date']}
                        text={item['title']}
                        image={featuredImages[index]}
                        buttons={() => {}}
                        onPress={() => {
                          setUrl(item['endpoint']);
                          navigation.navigate('Detail', {
                            name: item['title'],
                            endpoint: item['endpoint'],
                            url: item['endpoit'],
                            image: featuredImages[index],
                          });
                        }}
                        onLongPress={() => {}}
                        list={true}
                      />
                    );
                  }}
                />
                {errorFeatured && (
                  <Text
                    style={{
                      color:
                        theme == 'light'
                          ? Colors.primary100
                          : Colors.primary200,
                    }}>
                    An error occured...
                  </Text>
                )}
                {errorFeatured && (
                  <TouchableOpacity
                    onPress={() => {
                      let random = Math.floor(Math.random() * 6);
                      let random2 = Math.floor(Math.random() * 12);
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
                color: theme == 'light' ? Colors.primary100 : Colors.primary200,
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
                numColumns={2}
                keyExtractor={item => item.title}
                renderItem={({item, index}) => {
                  return (
                    <PrimaryInfoCard
                      name={''}
                      type="any"
                      date={item['date']}
                      text={item['title']}
                      image={images[index]}
                      buttons={() => {}}
                      onPress={() => {
                        setUrl(item['endpoint']);
                        navigation.navigate('Detail', {
                          name: item['title'],
                          endpoint: item['endpoint'],
                          image: images[index],
                        });
                      }}
                      onLongPress={() => {}}
                      list={false}
                    />
                  );
                }}
              />
            )}
            {errorExplore && (
              <Text
                style={{
                  color:
                    theme == 'light' ? Colors.primary100 : Colors.primary200,
                }}>
                An error occured...
              </Text>
            )}
            {errorExplore && (
              <TouchableOpacity
                onPress={() => {
                  let random = Math.floor(Math.random() * 6);
                  let random2 = Math.floor(Math.random() * 12);
                  initialLoad(genre[random2], false);
                }}>
                <Text
                  style={{
                    color:
                      theme == 'light' ? Colors.primary100 : Colors.primary200,
                  }}>
                  Tap to reload
                </Text>
              </TouchableOpacity>
            )}
            <>
              {updating && (
                <ActivityIndicator
                  style={{marginBottom: 20}}
                  color={'#666'}
                  size={40}
                />
              )}
            </>
            <>
              {limit ? (
                <Text
                  style={{
                    marginBottom: 20,
                    color:
                      theme == 'light' ? Colors.primary100 : Colors.primary200,
                  }}>
                  {' '}
                  You're all caught up for today. Pull to refresh
                </Text>
              ) : (
                <></>
              )}
            </>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 100,
            }}>
            <ActivityIndicator color={'#666'} size={40} />
            <Text
              style={{
                color: theme == 'light' ? Colors.primary100 : Colors.primary200,
              }}>
              Loading Books...
            </Text>
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
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={DocumentNav}
          options={({route}) => {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerShown: false,
            };
          }}
          name="View"
          component={DocumentRenderer}
        />
        <Stack.Screen
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerStyle: {
                backgroundColor:
                  theme == 'light' ? Colors.primary300 : Colors.primary100,
              },
              headerTintColor:
                theme == 'light' ? Colors.primary200 : Colors.primary200,
            };
          }}
          name="Detail"
          component={Detail}
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
  logo: {
    width: 30,
    height: 30,
    marginBottom: 0,
    borderRadius: 5,
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
    marginBottom: 10,
    height: 60,
    width: '100%',
    paddingTop: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#999',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingBottom: 15,
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
