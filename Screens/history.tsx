import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import DocumentRenderer from '../Documents/DocumentRender'



const Stack = createStackNavigator();

const HistMain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recently Opened</Text>
    </View>
  )
}


const History = ({navigation}) => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={HistMain}
            options={{headerShown: false}}
          />
          <Stack.Screen name="View" component={DocumentRenderer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default History;


const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        alignItems:'center'
    },
    heading:{
        marginTop:35,
        fontSize:20,
        fontWeight:'500'
    }
})