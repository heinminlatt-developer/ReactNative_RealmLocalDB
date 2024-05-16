import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';

const HeaderComponent = props => {
  const {
    title,
    showAddTodoList,
    hasAddButton,
    hasSortButton,
    sort,
    sortState,
    hasDeleteAllButton,
  } = props;
  return (
    <View style={StyleSheet.container}>
      {hasAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}>
          <Image
            style={styles.addButtonImage}
            source={require('../images/add-icon.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(224,93,144)',
    height: Platform.OS === 'ios' ? 100 : 80,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50,
  },
  addButton: {
    zIndex: 10,
    marginRight: 10,
    marginTop: 30,
  },
  addButtonImage: {
    width: 42,
    height: 12,
    tintColor: 'white',
  },
});
