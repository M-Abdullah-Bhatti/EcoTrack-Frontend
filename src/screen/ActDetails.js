import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';

const ActDetails = ({ route, navigation }) => {
  const { content } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: content?.tip || 'Details',
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, [navigation, content]);

  return (
    <View style={{paddingHorizontal: 12, paddingVertical: 18, backgroundColor: '#fff', flex: 1}}>
      <Text style={{fontSize: 16}}>{content?.description}</Text>
    </View>
  );
};

export default ActDetails;
