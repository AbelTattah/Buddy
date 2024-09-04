import {Alert, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import PrimaryButton from '../buttonPrimary';
import {SetStateAction} from 'react';
import {addToHistory} from '../../Screens/history';

// Download Component
export default function Download({
  url,
  name,
  setState,
  setItem,
}: {
  url: string;
  name: string;
  setState: SetStateAction<any>;
  setItem: SetStateAction<any>;
}) {
  // Document destination
  const dest = `${RNFS.DocumentDirectoryPath}/${name}`;

  // Download Options
  const options = {
    fromUrl: url,
    toFile: dest,
    progress: function (res: any) {
      setState(res.bytesWritten / res.contentLength);
    },
  };

  // Download function
  async function download() {
    // Update State from parent component
    setState(0.01);

    // Show Toast
    ToastAndroid.show('Download Started', ToastAndroid.SHORT);

    // Start Download
    await RNFS.downloadFile(options)
      .promise.then(res => {
        // Update State in parent component to indicate a successful download operation
        setState(1);

        // Update Item in parent component
        setItem({name: name, endpoint: dest});

        // Save file url and name in local storage
        addToHistory({name: name, endpoint: dest});
      })
      .catch(err => {
        // Inform the user about the error
        Alert.alert(
          'Error',
          err.message + '. Click on the Get Button to Try again',
          [
            {
              text: 'Ok',
            },
          ],
        );
      });
  }
  return (
    <PrimaryButton title="Get" size="" radius={10} pressHandler={download} />
  );
}
