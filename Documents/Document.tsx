import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native"; // Importing components from react-native
import React, { useState, useContext } from "react"; // Importing the useState hook from react
import axios from "axios"; // Importing axios

import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Importing the createNativeStackNavigator from @react-navigation/stack
import { NavigationContainer } from "@react-navigation/native"; // Importing the NavigationContainer from @react-navigation/native
import { userContext } from "../store/user";

import DocumentRender from "./DocumentRender";


const Stack = createNativeStackNavigator();

// Load fonts
const Documents = ({ navigation }:any) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
  const [titles, setTitles] = useState([]);

  const context = useContext(userContext);

  // Get endpoints for getting pdfs from api
  async function getEndpoints(couseCode:string) {
    try {
      console.log(code);
      const response = await axios.post(
        `https://buddy-zpdh.onrender.com/geturl`, {
          "keywords":code
        }
      );
      setEndpoints(response.data.links);
      setTitles(response.data.titles);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Search for past questions

  const searchHandler = () => {
    setLoading(true);
    getEndpoints("");
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  // Navigate to pdf view
  const navigationHandler = () => {
    setTimeout(() => {
      navigation.navigate("Document");
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
        placeholder="Enter course Code eg. MATH123"
        onChangeText={(text) => setCode(text)}
      >
        
      </TextInput>
      <TouchableOpacity
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
            </TouchableOpacity>
      <View>
        <View>
          <>

            {loading ? (
              <View
                style={{
                  height: 300,
                  width: 300,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  padding: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
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
                  {titles.map((endpoint, i) => (
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
                        context.setPdf(endpoints[i]);
                        navigationHandler();
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {endpoint}
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
          options={{
            title: "Document",
          }}
          component={DocumentRender}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DocumentNav;
