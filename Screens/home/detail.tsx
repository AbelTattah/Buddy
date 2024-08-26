import {StyleSheet, Text, View, Image, Share} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import PrimaryButton from '../../Components/button';
import Download from '../../Components/functions/download';
import {addToHistory, searchHistory} from '../history';
import {userContext} from '../../store/user';
import {check} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Entypo';
import Colors from '../../Components/constants/Colors';

const Detail = ({navigation, route}) => {
  const {image, name} = route.params;
  const [progress, setProgress] = useState(0);
  const [item, setItem] = useState<any>({});

  const {setPdf, url, setUrl, theme} = useContext(userContext);

  async function checkHistory() {
    await searchHistory(name).then(res => {
      if (res !== 'None') {
        setItem({name: name, endpoint: res});
        setProgress(1);
      }
    });
  }

  function ShareFile() {
    Share.share({
      title: 'Share',
      message: `Buddy ${url}`,
      url: item['endpoint'],
    });
  }

  useEffect(() => {
    checkHistory();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme == 'light' ? Colors.primary200 : Colors.primary100,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          maxHeight: 80,
          padding: 15,
          marginBottom: 20,
          borderBottomWidth: 0.3,
          borderBlockColor:theme == 'light' ? Colors.primary100 : Colors.primary200,
        }}>
        <Text
          style={[
            styles.title,
            {
              color: theme == 'light' ? Colors.primary100 : Colors.primary200,
            },
          ]}>
          {name}
        </Text>
        <Icon
          name="share"
          size={30}
          onPress={ShareFile}
          color={theme == 'light' ? Colors.primary100 : Colors.primary200}
        />
      </View>
      <View style={styles.imageContainer}>
        {image == undefined || image == '' ? (
          <Text>No Preview Image</Text>
        ) : (
          <Image source={{uri: image}} style={styles.preview} />
        )}
      </View>
      {progress > 0 ? (
        <View
          style={{
            width: '80%',
            borderWidth: 1,
            borderColor:
              theme == 'light' ? Colors.primary100 : Colors.primary200,
            height: 40,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          {progress !== 1 ? (
            <View
              style={{
                backgroundColor:
                  theme == 'light' ? Colors.primary300 : Colors.primary200,
                width: `${progress * 100}%`,
                height: 50,
              }}></View>
          ) : (
            <Icon
              name="check"
              size={30}
              color={'green'}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: [{translateX: -15}, {translateY: -15}],
              }}
            />
          )}
        </View>
      ) : null}
      {progress !== 1 ? (
        <Download
          setItem={setItem}
          url={url}
          name={name}
          setState={setProgress}
        />
      ) : (
        <PrimaryButton
          title="Open"
          size=""
          radius={10}
          pressHandler={() => {
            setUrl(item.endpoint);
            navigation.navigate('View', {
              name: name,
            });
          }}
        />
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-betweeen',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '90%',
    marginBottom: 35,
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    height: 60,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  preview: {
    marginTop: 20,
    borderRadius: 10,
    width: '90%',
    height: '100%',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    width: '90%',
    height: '15%',
  },
});
