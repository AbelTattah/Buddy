import {Alert, StyleSheet, Platform } from 'react-native' // Importing components from react-native
import React from 'react' // Importing components from react
import Pdf from 'react-native-pdf' // Importing the pdf component from react-native-pdf
import { DocumentView, RNPdftron } from "react-native-pdftron";

RNPdftron.enableJavaScript(true);


// Component to render pdf
export default function PdfComp ({ url }) {
  // Source of the pdf
  const source = { uri: url, cache: true }
  
  // Render the pdf
  return (
    <Pdf
      trustAllCerts={false}
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`)
      }}
      onPageChanged={(page, numberOfPages) => {
        console.log(`Current page: ${page}`)
      }}
      onError={(error) => {
        console.log(error)
        Alert.alert("Error loading pdf",`${error}`,
        [
          {text:"Ok"}
        ])
      }}
      onPressLink={(uri) => {
        console.log(`Link pressed: ${uri}`)
      }}
      style={stylee.pdf}
    />
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
  )
}

const stylee = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  pdf: {
    flex: 1
  }
})
