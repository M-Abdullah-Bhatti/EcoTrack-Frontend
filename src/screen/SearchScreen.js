import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import SinglePost from '../screen/Home/SinglePost';

const SearchScreen = ({ route }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { posts } = route.params;

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = posts.filter((post) => {
      const userName = post.user ? post.user.name.toLowerCase() : '';
      const description = post.postDescription ? post.postDescription.toLowerCase() : '';
      return userName.includes(text.toLowerCase()) || description.includes(text.toLowerCase());
    });
    setFilteredPosts(filtered);
  };

  const clearSearchText = () => {
    setSearchText('');
    setFilteredPosts([]);
  };

  const renderItem = ({ item }) => (
    <SinglePost post={item} />
  );

  const renderEmptyComponent = () => {
    if (!searchText) {
      return <Text style={styles.emptyText}>Start searching...</Text>;
    } else {
      return <Text style={styles.emptyText}>No related posts found</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={clearSearchText} style={styles.clearButton}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  clearButton: {
    marginLeft: 5,
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SearchScreen;
