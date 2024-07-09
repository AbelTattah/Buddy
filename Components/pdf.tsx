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
import {DocumentView, RNPdftron} from 'react-native-pdftron';
import {TextInput} from 'react-native-gesture-handler';
import {userContext} from '../store/user';
import styles from '../Styling/styles';

RNPdftron.enableJavaScript(true);

// Component to render pdf
export default function PdfComp({url}) {
  //Page number
  const [change, setChange] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageNumberValue, setValue] = useState(0)

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
          keyboardType='numeric'
          placeholder='Enter page '
          onChangeText={(e)=>setValue(parseInt(e))}
          placeholderTextColor={theme == 'dark' ? '#fff' : '#000'}
            style={[
              stylee.search,
              {color: theme == 'dark' ? '#fff' : '#000'},
            ]}></TextInput>
          <TouchableOpacity
          onPress={()=>setPageNumber(pageNumberValue)}
            style={[
              styles.loginButton,
              {width: 100, justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text style={{color: 'white'}}>Go</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
          Alert.alert('Error loading pdf', `${error}`, [{text: 'Ok'}]);
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
});
