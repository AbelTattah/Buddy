import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import DocumentRenderer from '../Documents/DocumentRender';
import Icon from 'react-native-vector-icons/Ionicons';
import {userContext} from '../store/user';
import PrimarySearch from '../Components/PrimarySearch';
import {SecondaryButton} from '../Components/button';
import Colors from '../Components/constants/Colors';
import Header from '../Components/header';

export const getHistory = async () => {
  try {
    const data: any = await AsyncStorage.getItem('history');
    // console.log("Book History",data);
    if (data == null) {
      await AsyncStorage.setItem('history', JSON.stringify({}));
      return AsyncStorage.getItem('history');
    }
    return data;
  } catch (error) {
    return Alert.alert('Error', 'An error occured');
  }
};

export const addToHistory = async (doc: {name: string; endpoint: string}) => {
  try {
    const previous: any = await getHistory();
    const history = JSON.parse(previous);
    history[doc.name] = doc.endpoint;
    await AsyncStorage.setItem('history', JSON.stringify(history));
  } catch (error) {
    return Alert.alert('Error', 'An error occured');
  }
};

export const searchHistory = async (name: string) => {
  try {
    const history: any = await getHistory();
    const parsed = JSON.parse(history);
    if (parsed[name]) {
      return parsed[name];
    } else {
      return 'None';
    }
  } catch (error) {
    return Alert.alert('Error', 'An error occured');
  }
};

export const removeHistory = async (name: string) => {
  try {
    const history: any = await getHistory();
    const parsed = JSON.parse(history);
    if (parsed[name]) {
      delete parsed[name];
      await AsyncStorage.setItem('history', JSON.stringify(parsed));
    } else {
      return null;
    }
  } catch (error) {
    return Alert.alert('Error', 'An error occured');
  }
};

const Stack = createNativeStackNavigator();

const HistMain = ({navigation}) => {
  const [history, setHistory] = useState<{}>({});
  const [marked, setMarked] = useState<string[]>([]);

  const {setPdf,setUrl, theme} = useContext(userContext);
  const [results, setResults] = useState<any[]>([]);

  const [searchInput, setSearchInput] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<{
    value: string;
    color: string;
  }>({value: 'Search for resources', color: '#d9d9d9'});

  const [searching, setSearching] = useState<boolean>(false);

  async function search() {
    setPlaceholder({value: 'Search for resources', color: '#d9d9d9'});
    if (searchInput == '') {
      setPlaceholder({value: 'Please enter a search term !', color: '#f009'});
      return;
    }
    setSearching(true);
    setSearching(false);
  }

  async function Load() {
    await getHistory().then(data => {
      setHistory(JSON.parse(data));
    });
  }

  async function removeMarked(name: string) {
    const edited: any = marked.map(item => {
      if (name == item) {
        return;
      } else {
        return item;
      }
    });
    setMarked(edited);
  }

  async function removeItem() {
    for (var u = 0; u < marked.length; u++) {
      await removeHistory(marked[u]);
    }
  }

  useEffect(() => {
    Load();
    setInterval(() => {
      Load();
    }, 3000);
  }, []);

  return (
    <View
      style={{
        backgroundColor:
          theme == 'light' ? Colors.primary200 : Colors.primary100,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={style.top}>
        {/* <PrimarySearch
          textInput={
            <TextInput
              style={style.searchInput}
              onSubmitEditing={() => search()}
              onChangeText={(text) => {
                setPlaceholder({
                  value: 'Search for resources',
                  color: '#d9d9d9',
                });
                setSearchInput(text);
              }}
              placeholder={placeholder.value}
              placeholderTextColor={placeholder.color}
              value={searchInput}
            />
          }
          handleSearch={() => search()}
        /> */}
      </View>

      <View
        style={{
          height: '90%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {Object.keys(history).length == 0 && <Text>No recent Resources</Text>}
        {history ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                borderBottomWidth: 0.3,
                borderBottomColor:theme == 'light' ? Colors.primary100 : Colors.primary200,
                paddingBottom: 15,
                marginBottom: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color:
                    theme == 'light' ? Colors.primary100 : Colors.primary200,
                }}>
                Recents
              </Text>
              <Text
                style={{
                  color:
                    theme == 'light' ? Colors.primary100 : Colors.primary200,
                }}>
                Files {`(`}
                {Object.keys(history).length}
                {`)`}
              </Text>
            </View>
            <FlatList
              style={{
                width: '86%',
                height: '80%',
                marginBottom: 50,
              }}
              showsVerticalScrollIndicator={false}
              data={Object.keys(history).reverse()}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onLongPress={() => {
                        removeHistory(item);
                      }}
                      onPress={() => {
                        const url: any = searchHistory(item);
                        console.log('URL: ', history[item]);
                        setUrl(history[item]);
                        navigation.navigate('View', {book: item});
                        // if (marked.filter((name)=>name==item) == null) {
                        //   setPdf(searchHistory(item));
                        // } else {
                        //   removeMarked(item);
                        // }
                      }}
                      style={style.button1}>
                      <Text
                        style={{
                          color:
                            theme == 'light'
                              ? Colors.primary100
                              : Colors.primary200,
                          fontSize: 16,
                          fontWeight: '500',
                          width: '80%',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                    <Icon
                      name="close-outline"
                      size={20}
                      color={
                        theme == 'light' ? Colors.primary100 : Colors.primary200
                      }
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                      }}
                      onPress={() => {
                        removeHistory(item);
                      }}
                    />
                  </View>
                );
              }}
              keyExtractor={item => item}
            />
          </>
        ) : (
          <Text
            style={{
              color: theme == 'light' ? Colors.primary100 : Colors.primary200,
            }}>
            No recent resource
          </Text>
        )}
      </View>
    </View>
  );
};

const History = ({navigation}) => {
  const {setPdf, theme} = useContext(userContext);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HistMain}
          options={({navigation, route}: any) => {
            return {
              headerShadowVisible: false,
              header: () => (
                <Header title="History" sub="Resource" button={<></>} />
              ),
            };
          }}
        />
        <Stack.Screen
          name="View"
          options={({route}) => {
            const title = route.params.book;
            return {
              title: title,
              headerShown: false,
            };
          }}
          component={DocumentRenderer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default History;

const style = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 30,
    zIndex: 3,
    elevation: 2,
  },
  button1: {
    width: '100%',
    height: 'auto',
    paddingBottom: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'flex-start',
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    marginTop: 35,
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  top: {
    width: '100%',
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 30,
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
});
