import { Alert, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import PrimaryButton from '../button';
import { SetStateAction } from 'react';
import { addToHistory } from '../../Screens/history';
import { useState } from 'react';

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
  const dest = `${RNFS.DocumentDirectoryPath}/${name}`;
  const options = {
    fromUrl: url,
    toFile: dest,
    progress: function (res: any) {
      setState(res.bytesWritten / res.contentLength);
    },
  };
  async function download() {
    ToastAndroid.show("Download Started",ToastAndroid.SHORT)
    await RNFS.downloadFile(options)
      .promise.then((res) => {
        console.log('The file saved to ', res);
        setState(1);
        setItem({ name: name, endpoint: dest });
        addToHistory({ name: name, endpoint: dest });
      })
      .catch((err) => {
        Alert.alert('Error',err.message,[
          {
            "text":"Ok"
          }
        ])
      });
  }
  return (
    <PrimaryButton title="Get" size="" radius={10} pressHandler={() => { download()}} />
  );
}
