import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    ScrollView,
    StyleSheet,
    Image,
  } from "react-native";
  import { useState } from "react";
  import React from "react";
  import Colors from "../colors/colors";

  
  const Home = () => {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.main}>
          <View style={styles.header}>
            <View style={styles.topCard}>
              <Text style={styles.greeting}>Hello, Devs</Text>
              <Text style={styles.greetingInfo}>
                {/* {onGoingTasks.length} Tasks today */}
              </Text>
            </View>
          </View>
          <View style={styles.search}>
            <TextInput
              placeholderTextColor={"black"}
              placeholder="Search"
              style={styles.input}
            ></TextInput>
          </View>
          <Text style={styles.sectionHeader}>Categories</Text>
          <ScrollView horizontal={true} style={styles.categories}>
            {/* {Categories.map((item, index) => {
              return (
                <CategoriesCard category={item} count={findTask(item).length} />
              );
            })} */}
          </ScrollView>
          <Text style={styles.sectionHeader}>Ongoing Task</Text>
          <ScrollView style={styles.tasks}>
            {/* {onGoingTasks.map((item, index) => {
              return <TaskCard task={item.task} />;
            })} */}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary100,
      alignItems: "center",
      justifyContent: "center",
    },
    main: {
      width: "90%",
      height: "100%",
      paddingTop: 13,
    },
    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    topCard: {
      width: "60%",
    },
    profilePic: {
      width: 50,
      height: 52,
    },
    filter: {
      height: 50,
      width: 48,
    },
    greeting: {
      fontSize: 38,
      color: "black",
    },
    greetingInfo: {
      color: "black",
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
      height: "10%",
      paddingTop: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    input: {
      height: 50,
      width: "80%",
      backgroundColor: Colors.primary100,
      borderRadius: 10,
      paddingLeft: 15,
      borderWidth: 0.167,
      borderStyle: "solid",
      borderColor: "#ddd",
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight:'bold'
    },
  });
  