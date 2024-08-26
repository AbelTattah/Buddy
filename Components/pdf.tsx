import {
  Alert,
  StyleSheet,
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'; // Importing components from react-native
import React, {useContext, useState} from 'react'; // Importing components from react
import Pdf from 'react-native-pdf'; // Importing the pdf component from react-native-pdf
import {TextInput} from 'react-native-gesture-handler';
import {userContext} from '../store/user';
import styles from '../Styling/styles';


// Component to render pdf
export default function PdfComp({url}) {
  //Page number
  const [change, setChange] = useState(false);
  var cacheExpiration = 0;
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumberValue, setValue] = useState(0);

  // Source of the pdf
  const source = {uri: url, cache: true};

  //Theme context
  const {theme} = useContext(userContext);

  // Render the pdf
  return (
    <>
      {change ? (
        <View
          style={[
            stylee.changePage,
            {backgroundColor: theme == 'dark' ? '#000' : '#fff'},
          ]}>
          <TextInput
            keyboardType="numeric"
            placeholder="Enter page number "
            onChangeText={e => setValue(parseInt(e))}
            placeholderTextColor={theme == 'dark' ? '#fff' : '#000'}
            style={[
              stylee.search,
              {width: 150, color: theme == 'dark' ? '#fff' : '#000'},
            ]}></TextInput>
          <TouchableOpacity
            onPress={() => setPageNumber(pageNumberValue)}
            style={[
              styles.loginButton,
              {width: 70, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={{color: 'white'}}>Go</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <>
          <View
            style={[
              stylee.progressBar,
              {
                backgroundColor: theme == 'light' ? '#fff' : '#000',
                borderColor: theme == 'light' ? '#000' : '#fff',
              },
            ]}>
            <View
              style={{
                width: `${percentage}%`,
                position: 'relative',
                height: '100%',
                backgroundColor: theme == 'light' ? '#000' : '#fff',
              }}></View>
          </View>
        </>
      ) : (
        <></>
      )}
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadProgress={percent => {
          setLoading(true);
          setPercentage(percent * 100);
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoading(false);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
          Alert.alert('Error loading pdf', `${error}`, [{text: 'Ok'}]);
          cacheExpiration = 3;
        }}
        page={pageNumber}
        onPageSingleTap={() => {
          if (change == false) {
            setChange(true);
          } else {
            setChange(false);
          }
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={stylee.pdf}
      />
    </>
    //   <DocumentView
    //   document={url}
    //   showLeadingNavButton={true}
    //   leadingNavButtonIcon={
    //     Platform.OS === "ios"
    //       ? "ic_close_black_24px.png"
    //       : "ic_arrow_back_white_24dp"
    //   }
    //   onLoadError ={
    //     (error)=>{
    //       console.log(error)
    //     }
    //   }
    // />
  );
}

const stylee = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
  },
  changePage: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  search: {
    width: '15%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  progressBar: {
    width: '90%',
    height: 30,
    top: 200,
    borderWidth: 0.7,
    margin: 20,
  },
});
