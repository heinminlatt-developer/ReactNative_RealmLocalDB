import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  updateTodoList,
  deleteAllTodoList,
  queryAllTodoList,
} from '../databases/allSchemas';
import Realm from '../databases/allSchemas';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

let FlatListItem = props => {
  const {id, name, creationDate, itemIndex, onPressItem, popupDialogComponent} =
    props;

  showEditModal = () => {};

  showDeleteConfirmation = () => {
    Alert.alert(
      'Delete',
      'Delete a todoList',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <Swipeout
      right={[
        {
          text: 'Edit',
          backgroundColor: 'rgb(81,134,237)',
          onPress: showEditModal,
        },
        {
          text: 'Delete',
          backgroundColor: 'rgb(217,80,64)',
          onPress: showDeleteConfirmation,
        },
      ]}
      autoClose={true}></Swipeout>
  );
};
export default class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [],
    };
  }
  reloadData = () => {
    queryAllTodoList()
      .then(todoLists => {
        this.setState({todoLists});
      })
      .catch(error => {
        this.setState({todoLists: []});
      });
    console.log('reloadData');
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          data={this.state.todoLists}
          renderItem={({item, index}) => (
            <FlatListItem
              {...item}
              itemIndex={index}
              popupDialogComponent={this.refs.popupDialogComponent}
              onPressItem={() => {
                Alert('you press item');
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
        <popupDialogComponent ref={'popupDialogComponent'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  flatList: {
    flex: 1,
    flexDirection: 'column',
  },
});
