import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

const PostOptions = ({handleDelete, setPostOptionsVisible}) => {
    
    const snapPoints = ["25%"];
    const options = [
        {
            icon: <FontAwesome name="share" size={24} color="black" />,
            text: "Share"
        },
        {
            icon: <MaterialIcons name="report" size={24} color="black" />,
            text: "Report"
        },
        {
            icon: <AntDesign name="delete" size={24} color="black" />,
            text: "Delete",
            onPress: () => showDeleteConfirmation(handleDelete),
        }
    ];

    const handleCloseBottomSheet = () => {
        setPostOptionsVisible(false);
    };

    const showDeleteConfirmation = (handleDelete) => {
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => handleDelete() }
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const backAction = () => {
        setOpen(false);
        return true;
        };

        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );

        return () => backHandler.remove();
    }, []);

  return (
    <BottomSheet index={0} snapPoints={snapPoints} enablePanDownToClose onClose={handleCloseBottomSheet} >
        <View style={{ width: "100%" }}>
            {options.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        padding: 14,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                    onPress={item.onPress}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {item.icon}
                        <Text style={{ marginLeft: 8 }}>{item.text}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </BottomSheet>
  )
}

export default PostOptions