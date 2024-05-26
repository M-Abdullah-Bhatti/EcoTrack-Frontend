import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function StoryComponent() {

    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    const { user } = useSelector((state) => state.user);
    const currentUserProfilePic = user?.profilePic ? user?.profilePic : 'https://firebasestorage.googleapis.com/v0/b/eco-track-37da4.appspot.com/o/placeholder.jpg?alt=media&token=c66ff328-dc76-4ea4-8cbe-6e5d454de3ff';
    const currentStoryOwnerProfilePic = (item) => { return item.profilePic ? item.profilePic : 'https://firebasestorage.googleapis.com/v0/b/eco-track-37da4.appspot.com/o/placeholder.jpg?alt=media&token=c66ff328-dc76-4ea4-8cbe-6e5d454de3ff' };

    useFocusEffect(
        React.useCallback(() => {
            const getUsersWithStories = async () => {
                const data = await axios.get(
                  "https://ecotrack-dev.vercel.app/api/story/"
                );
                setUsers(data.data);
                console.log("STORIES: ", data.data);
            };
      
            getUsersWithStories();
        }, [])
    );
  
    return (
        <ScrollView style={{paddingBottom: 10, paddingTop: 5, backgroundColor: '#f1f1f1', flexDirection: 'row'}} 
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View style={{padding: 7}}>
                <Image source={{uri: currentUserProfilePic}} style={{width: 70, backgroundColor: 'pink', height: 70, borderRadius: 100, borderWidth: 1, borderColor: '#000'}} />
                <View style={{position: 'absolute'}}>
                    <TouchableOpacity style={{marginTop: 55, backgroundColor: 'black', marginLeft: 55, width: 23, height: 23, borderRadius: 50, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center'}} onPress={()=> navigation.navigate("Upload", {type: "story"})}>
                        <Ionicons name="add" size={24} color="white" style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 16}} />
                    </TouchableOpacity>
                    <Text style={[styles.username, {textTransform: 'capitalize'}]}>Your Story</Text>
                </View>
            </View>
            {/* <FlatList 
                data={users}
                keyExtractor={(_, index)=> index}
                renderItem={({item})=> {
                    return (
                        <TouchableOpacity style={{width: 85, padding: 5}} onPress={()=> navigation.navigate("Story", {userId: item._id})}>
                            <Image source={{uri: item?.profilePic}} style={{width: 70, borderWidth: 2.5, borderColor: '#2DBAA0', backgroundColor: 'pink', height: 70, borderRadius: 100}} />
                            <Text style={styles.username}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            /> */}

            {
                users.map((item, index)=> (
                    <TouchableOpacity style={{width: 85, padding: 5}} onPress={()=> navigation.navigate("Story", {userId: item._id})} key={index}>
                            <Image source={{uri: currentStoryOwnerProfilePic(item)}} style={{width: 70, borderWidth: 2.5, borderColor: '#2DBAA0', height: 70, borderRadius: 100}} />
                            <Text style={styles.username}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
   username: {
        textAlign: 'center',
        fontSize: 12, 
        marginTop: 5, 
        textTransform: 'lowercase'
    }
})