import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { insertNewTodoList } from '../databases/allSchemas';

export default class PopupDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      name: '',
    };
  }

  showDialogComponentForAdd = () => {
    this.refs.popupDialog.show();
    this.setState({
      dialogTitle: 'Add a New Todo List',
      name: '',
      isAddNew: true,
    });
  };

  render() {
    return (
      <PopupDialog
        dialogTitle={<DialogTitle title={this.state.dialogTitle} />}
        width={0.7}
        height={180}
        ref={'popupDialog'}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Todo List Name"
            autoCorrect={false}
            onChangeText={text => this.setState({ name: text })}
            value={this.state.name}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (this.state.name.trim() === '') {
                  Alert.alert('Please enter a Todo name');
                  return;
                }
                this.refs.popupDialog.dismiss(() => {
                  if (this.state.isAddNew) {
                    const newTodoList = {
                      id: Math.floor(Date.now() / 1000),
                      name: this.state.name,
                      createDate: new Date(),
                    };
                    insertNewTodoList(newTodoList)
                      .then(() => {
                        console.log('New TodoList added');
                      })
                      .catch(error => {
                        Alert.alert(`Insert new TodoList error: ${error}`);
                      });
                  }
                });
              }}
            >
              <Text style={styles.textLabel}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.refs.popupDialog.dismiss(() => {
                  console.log('Cancelled, dismissed popup');
                });
              }}
            >
              <Text style={styles.textLabel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupDialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    minWidth: '40%',
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

