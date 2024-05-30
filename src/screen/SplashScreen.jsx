import { useEffect } from 'react'
import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux';

const SplashScreen = ({navigation}) => {
  
  useEffect(() => {
    const { token } = useSelector((state)=> state.user);
    
    setTimeout(() => {
      if (token) {
        navigation.replace('Main')
      } else {
        navigation.replace('AuthNavigation')
      }
    }, 3000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'white'}}>
    <View style={{height: '65%'}}>
      <LottieView source={require('../../assets/lottie/splash.json')}
        style={{}}
        autoPlay
        loop
      />
    </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text style={{fontSize: 36, fontFamily: 'Shopia', color: '#46A667'}}>EcoTrack</Text>
        <Text style={{fontSize: 18, fontFamily: 'Shopia', color: '#5DBF7E'}}>Revolutionizing carbon footprint awareness</Text>
      </View>
    </View>
  )
}

export default SplashScreen