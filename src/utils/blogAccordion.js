import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from '@expo/vector-icons';

const BlogAccordion = ({ blogs }) => {
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = (section, index, isActive) => {
    return (
      <View style={[styles.header, isActive && styles.activeHeader]}>
        <Text style={styles.headerText}>{section.heading}</Text>
        <Ionicons
          name={isActive ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={24}
          color="#000"
        />
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content.substring(0, 50)}...</Text>
        <TouchableOpacity  onPress={() => toggleAccordion(section)}>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const toggleAccordion = (section) => {
    const isOpen = activeSections.includes(section);
    if (isOpen) {
      setActiveSections(activeSections.filter((sec) => sec !== section));
    } else {
      setActiveSections([...activeSections, section]);
    }
  };

  return (
    <Accordion
      sections={blogs}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setActiveSections}
      containerStyle={styles.accordionContainer}
    />
  );
};

const styles = StyleSheet.create({
accordionContainer: {
    marginHorizontal: 10,
    borderColor: 'black',
    margin: 3,
    borderRadius: 5
    },
    sectionContainer: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    },
    activeHeader: {
    backgroundColor: '#46A667', 
    },
      
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium'
  },
  content: {
    padding: 10,
    fontFamily: 'PoppinsRegular'
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default BlogAccordion;
