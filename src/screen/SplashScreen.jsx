import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const SplashScreen = () => {
  return (
    <View style={{flex: 1, marginTop: 50, justifyContent: 'flex-end'}}>
    <View style={{height: '75%'}}>
      <LottieView source={require('../../assets/lottie/splash.json')}
        style={{}}
        autoPlay
        loop
      />
    </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>EcoTrack</Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Revolutionizing carbon footprint awareness</Text>
      </View>
    </View>
  )
}

export default SplashScreen