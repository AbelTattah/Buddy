import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native"; // Importing components from react-native
import React, { useState, useContext, useEffect } from "react"; // Importing the useState hook from react
import axios from "axios"; // Importing axios

import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Importing the createNativeStackNavigator from @react-navigation/stack
import { NavigationContainer } from "@react-navigation/native"; // Importing the NavigationContainer from @react-navigation/native
import { userContext } from "../store/user";

import DocumentRender from "./DocumentRender";

/*
TODO: 

3. Previous Searches
1. Book Persistence
2. Previous Books
*/


const Stack = createNativeStackNavigator();

var titlesCache:any[] = []; 
var endpoints:any[] = [];



// Load fonts
const Documents = ({ navigation }:any) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState<any[]>([]);
  const [currentPdf, setCurrentPdf] = useState<string>("");

  const context = useContext(userContext);

  //Pdf regex
  const test = /pdf/


  // Get endpoints for getting pdfs from api
  async function getEndpoints(bookCode:string) {
    try {
      const response = await axios.post(
        'http://207.211.176.165/buddy', {
          "keywords":bookCode
        }
      );
      // Filter pdf endpoints
      for (var v = 0; v < response.data.links.length; v++) {
        if (test.test(response.data.links[v])) {
          endpoints.push(response.data.links[v])
          titlesCache.push(response.data.titles[v])
        }
      }
      
      setTitles(titlesCache)
    } catch (error) {
      setTitles(["An error occured"])
    }
  }

  // Search for past questions
  const searchHandler = () => {
    setLoading(true);
    getEndpoints(code);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      if (titles[0] !=="Not found" || titles[0] !== "An error occured")  {
        navigation.navigate("Document",{
          book:currentPdf
        });
      }
    }, 1000);
  };


  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: "#fff",
      }}
    >
      <TextInput
        style={{
          borderColor: "grey",
          borderBottomWidth: 1,
          height: 60,
          width: 300,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Enter book name"
        onChangeText={(text) => {
          setCode(text)
        }}
      >

        
      </TextInput>
      <TouchableOpacity
      onPress={()=>searchHandler()}
      style={{
        position:'absolute',
        top:26,
        left:300,
      }}
      >
      <Image 
        source={require('../assets/search.png')}
        style={{

          width:28,
          height:28
        }}/>
        </TouchableOpacity>
      {/* <TouchableOpacity
              style={{
                width: 70,
                height: 30,
                marginLeft: 240,
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#7979FF8e",
                zIndex: 1,
              }}
              onPress={() => {
                searchHandler();
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Search
              </Text>
            </TouchableOpacity> */}
      <View>
        <View>
          <>

            {loading ? (
              <View
                style={{
                  flex:1,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large"/>
              </View>
            ) : (
              <>
                <ScrollView
                  style={{
                    height: 300,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  {titles.map((title, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        width: 300,
                        height: 86,
                        backgroundColor: "#fff",
                        borderColor: "#00f",
                        elevation:3,
                        borderWidth:0.3,
                        borderRadius: 3,
                        justifyContent: "center",
                        margin: 10,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        console.log(endpoints[i])
                        context.setPdf(endpoints[i]);
                        setCurrentPdf(title);
                        navigationHandler();
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
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

const DocumentNav = ({ navigation }) => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen 
          name="Documents"
          options={{
            title: "Buddy",
            headerStyle: {
              shadowOpacity: 0,
              height: 110,
              borderBottomWidth: 0,
              elevation: 0,
            },
          }}
          component={Documents} />
        <Stack.Screen
          name="Document"
          options={
            ({route})=>{
              const title = route.params.book;
              return {
                title:title
              }
            }
          }
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