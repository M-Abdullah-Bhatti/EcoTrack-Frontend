import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.curvedContainer}>
      <View style={styles.leftContent}>
      <Image
            source={require('../../../assets/drop.gif')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.rightContent}>
        <Text style={styles.heading}>EcoTrack</Text>
          <Text style={styles.subHeading}>Guide to Sustainable Future</Text>
          
        </View>
      </View>
      <View style={styles.CardContainer}>
        <View style={styles.Card}>
          
        </View>
        <View style={styles.Card}>

        </View>
       

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : '0px',
    backgroundColor: 'white',
    alignItems: 'center',
    // paddingHorizontal: 20,
  },
  btn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#46A667',
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  curvedContainer: {
    width: '100%',
    height: 230,
    backgroundColor: '#46A667',
    borderBottomLeftRadius: 150, // Adjust the value for more curve
    borderBottomRightRadius: 30, // No curve on the right
    overflow: 'hidden',
    flexDirection: 'row', // Ensures children don't overflow
  },
  leftContent: {
    flex: 3, 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    paddingLeft: 20, // Add some left padding
  },
  rightContent: {
    marginLeft: '5%',
    flex: 4, // Takes 70% of the curved container
    justifyContent: 'center', // Center the image vertically
    alignItems: 'flex-start', // Align the image to the right
    paddingRight: 20, // Add some right padding
  },
  heading: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "PoppinsSemiBold"
  },
  subHeading: {
    fontSize: 18,
    color: 'white',
    fontFamily: "PoppinsRegular"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50, // Make it circular
  },
  heading2:{
    marginTop: '3%',
    fontSize: 18,
    color: 'black',
    fontFamily: "PoppinsMedium"
  },
  CardContainer:{
    marginTop: '-10%',
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  Card:{
    borderColor: 'black',
    borderWidth: 1,
    height: 200,
    width: '45%',
    marginHorizontal: 3,
    borderRadius: 10
  }
});

export default MainScreen;
