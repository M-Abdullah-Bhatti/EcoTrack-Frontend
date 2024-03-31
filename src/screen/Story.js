import {View, Text, Image, Dimensions, TouchableOpacity, Animated} from 'react-native'
import React, {useState, useRef} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('screen')

const Story = ()=> {
  
  const navigation = useNavigation()
  const [current, setCurrent] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  
  const start = ()=> {
    if (content[current].type == 'video') {
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
  
  const [content, setContent] = useState([
  {
    content: 'https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee',
    type: 'image',
    finish: 0
  },
  {
    content: 'https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/puppy.jpg?alt=media&token=1f649d14-eb1d-43bc-9c81-62c199c3b4ea',
    type: 'image',
    finish: 0
  },
  {
    content: 'https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee',
    type: 'image',
    finish: 0
  },
  {
    content: 'https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/puppy.jpg?alt=media&token=1f649d14-eb1d-43bc-9c81-62c199c3b4ea',
    type: 'image',
    finish: 0
  },
  {
    content: 'https://firebasestorage.googleapis.com/v0/b/clone-86962.appspot.com/o/IMG-20220831-WA0006.jpg?alt=media&token=8f4b0b18-0286-41f4-9578-34f3daba8fee',
    type: 'image',
    finish: 0
  },
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {content[current].type == 'video' ? 
      <Video
      source={content[current].content}
      resizeMode="cover"
      paused={false}
      style={{height: height, width: width}}
      />
      :
      <Image source={{uri: content[current].content}} style={{width: width, height: height*0.9, resizeMode: 'cover'}} onLoadEnd={()=> {
        progress.setValue(0);
        start();
      }} />}

      <View style={{width: width, position: 'absolute', top: 10, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
      {content.map((item, index)=> {
        return (
          <View style={{flex: 1, height: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginLeft: 5, flexDirection: 'row'}}>
          <Animated.View style={{flex: current == index ? progress : content[index].finish, height: 3, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
          </Animated.View>
          </View>
        )
      })}
      </View>

      <View style={{width: width, height: 50, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../storage/images/image1.jpg')} style={{width: 35, height: 35, borderRadius: 20, marginLeft: 10}} />
          <Text style={{fontSize: 16, fontWeight: '600', marginLeft: 10, color: 'white'}}>rizwanahmed625</Text>
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