import React, {useState, useRef, useEffect} from 'react'
import {View, Text, Image, Dimensions, TouchableOpacity, Animated} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const {width, height} = Dimensions.get('screen')

const Story = ({route})=> {
  
  const navigation = useNavigation();
  const [content, setContent] = useState([]);

  const { userId } = route.params;
  
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  
  const start = ()=> {
    if (content[current]?.type == 'video') {
      if (load) {
        Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false
        }).start(({finished})=> {
          if (finished) {
            next();
          }
        })
      }
    } else {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false
    }).start(({finished})=> {
      if (finished) {
        next();
      }
    })
  }
  }

  const next = ()=> {
    if(current != content.length - 1) {
      let tempData = content;
      tempData[current].finish = 1;
      setContent(tempData);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  }

  const previous = ()=> {
    if(current - 1 >= 0) {
      let tempData = content
      tempData[current-1].finish = 0;
      setContent(tempData);
      setCurrent(current - 1);
      progress.setValue(0);
    } else {
      close();
    }
  }

  const close = ()=> {
    progress.setValue(0);
    navigation.goBack();
  }

  useEffect(() => {
    const getStoriesOfUser = async () => {
      const data = await axios.get(
        `https://ecotrack-dev.vercel.app/api/story/${userId}`
      );
      setContent(data.data);
      console.log("STORIESSSSSS: ", data.data[0]);
    };

    getStoriesOfUser();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#000', marginTop: 25}}>
      {
        content[current]?.type == 'video' ? 
        <Video
          source={content[current].imageUrl}
          resizeMode="cover"
          paused={false}
          style={{height: height, width: width}}
        />
        :
        <Image source={{uri: content[current]?.imageUrl}} style={{width: width, height: height*0.9, resizeMode: 'cover'}} onLoadEnd={()=> {
          progress.setValue(0);
          start();
        }} />
      }

      <View style={{width: width, position: 'absolute', top: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
      {content.map((item, index)=> {
        return (
          <View style={{flex: 1, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginLeft: 5, flexDirection: 'row'}} key={index}>
            <Animated.View style={{flex: current == index ? progress : content[index].finish, height: 3, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
            </Animated.View>
          </View>
        )
      })}
      </View>

      <View style={{width: width, height: 50, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: content[0]?.user?.profilePic}} style={{width: 35, height: 35, borderRadius: 20, marginLeft: 10}} />
          <Text style={{fontSize: 16, fontWeight: '600', marginLeft: 10, color: 'white'}}>{content[0]?.user?.name}</Text>
        </View>
        <TouchableOpacity style={{marginRight: 10, position: 'absolute', top: 15, right: 8}} onPress={()=> close()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{width: width, height: height, position: 'absolute', top: 100, flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={{width: '30%', height: '100%'}} onPress={()=> previous()}>
        </TouchableOpacity>
        <TouchableOpacity style={{width: '30%', height: '100%'}} onPress={()=> next()}>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Story;