import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from './constants/Colors';

/**
 * This is a primary Button for the App
 *
 * @param {string} title The text that appears on the button
 * @param {string} size  The size of the button: "big", "small" or "medium"
 * @param {number}
 * @returns {ReactNode} A React Native element that renders a button
 */

export const SecondaryButton = ({
  pressHandler,
  title,
}: {
  pressHandler: () => void;
  title: string;
}) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text style={{color:"white",fontSize:13}}>{title}</Text>
    </TouchableOpacity>
  );
};

const PrimaryButton = ({
  title,
  size,
  radius,
  pressHandler,
}: {
  title: string;
  size: string;
  radius: number;
  pressHandler: () => {} | void;
}) => {
  return (
    <TouchableOpacity
      style={{
        width: size == 'big' ? '90%' : size == 'small' ? '70%' : 90,
        height: size == 'big' ? 50 : size == 'small' ? 40 : 35,
        backgroundColor: Colors.primary300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10 || radius,
        margin: 20,
      }}
      onPress={pressHandler}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
