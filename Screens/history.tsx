import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DocumentRenderer from '../Documents/DocumentRender';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import styles from '../Styling/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {userContext} from '../store/user';

export const getHistory = async () => {
  try {
    const data: any = await AsyncStorage.getItem('history');
   // console.log("Book History",data);
    if (data==null) {
      await AsyncStorage.setItem('history', JSON.stringify({}));
      return AsyncStorage.getItem('history');
    }
    return data;
  } catch (error) {
    return Alert.alert('Error', "An error occured");
  }
};

export const addToHistory = async (doc: {name: string; endpoint: string}) => {
  try {
    const previous: any = await getHistory();
    const history = JSON.parse(previous);
    history[doc.name] = doc.endpoint;
    await AsyncStorage.setItem('history', JSON.stringify(history));
  } catch (error) {
    return Alert.alert('Error', "An error occured");
  }
};

export const searchHistory = async (name: string) => {
  try {
    const history: any = await getHistory();
    const parsed = JSON.parse(history);
    if (parsed[name]) {
      return parsed[name];
    } else {
      return "None";
    }
  } catch (error) {
    return Alert.alert('Error', "An error occured");
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
    return Alert.alert('Error', "An error occured");
  }
};

const Stack = createStackNavigator();

const HistMain = ({navigation}) => {
  const [history, setHistory] = useState<{}>({});
  const [marked, setMarked] = useState<string[]>([]);

  const {setPdf,theme} = useContext(userContext);

  async function Load() {
    await getHistory().then(data => {
      setHistory(JSON.parse(data));
    });
  }

  async function removeMarked(name: string) {
    const edited: any = marked.map(item => {
      if (name == item) {
        return
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
    }
    , 3000);
  }, []);

  return (
    <View style={{
      backgroundColor: theme=="light"?"#fff":"#000",
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    }}>
      <>
      {marked.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            removeItem();
          }}
          style={style.deleteButton}>
          <Icon name="remove-outline" size={22} color="#999" />
        </TouchableOpacity>
      ) : (
        <></>
      )} 
      </>
      <Text style={{
          marginTop: 35,
          fontSize: 23,
          color:theme=="light"?"black":"white",
          fontWeight: '900',
      }}>Recently Opened</Text>
      <View style={{
                    marginTop: 20,
                    height: '90%',
                    justifyContent:'center',
                    flexDirection: 'column',
                    alignItems: 'center'
      }}>
      {history ? (
        <>
        <FlatList
          style={{
            marginTop: 20,
            width:"86%",
            height:"80%",
            marginBottom:50,
          }}
          showsVerticalScrollIndicator={false}
          data={Object.keys(history).reverse()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  removeHistory(item);
                }}
                onPress={() => {
                  const url:any = searchHistory(item)
                  console.log("URL: ", history[item])
                  setPdf(history[item]);
                  navigation.navigate('View',{book:item});
                  // if (marked.filter((name)=>name==item) == null) {
                  //   setPdf(searchHistory(item));
                  // } else {
                  //   removeMarked(item);
                  // }
                }}
                style={styles.button1}>
                <Text
                style={{
                  color:theme=="light"?"black":"white",
                  fontSize: 16,
                  fontWeight: '500',
                }}
                >{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item}
        />
        <Text style={{
          position:"absolute",
          color:"#f007",
          bottom:10
        }}>Hold to delete</Text>
        </>
      ) : (
        <Text>No recent books</Text>
      )}
      </View>
    </View>
  );
};

const History = ({navigation}) => {
  const {setPdf,theme} = useContext(userContext);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={HistMain}
          options={{headerShown: false}}
        />
        <Stack.Screen name="View"
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
        component={DocumentRenderer} />
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
  heading: {
    marginTop: 35,
    fontSize: 20,
    color:"black",
    fontWeight: '500',
  },
});
