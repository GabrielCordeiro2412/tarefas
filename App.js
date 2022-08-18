import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  async function handleAddTask(){
    setTaskItems([...taskItems, task])
    await AsyncStorage.setItem('@taskList:tasks', JSON.stringify(taskItems))
    setTask("");
    console.log(await AsyncStorage.getItem('@taskList:tasks'))
  }

  useEffect(() =>{
    async function fetchData(){
      await AsyncStorage.getItem('@taskList:tasks').then((value) => {
        console.log(value);
        setTaskItems(JSON.parse(value))
    });
      
    }fetchData()
  },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Lista
        </Text>
        <View style={styles.flex}>
          <TextInput
            placeholder="Digite o item"
            value={task}
            onChangeText={text => setTask(text)}
            underlineColorAndroid="transparent"
            style={styles.textInputStyle}
          />
          <TouchableOpacity
            onPress={handleAddTask}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}> Adicionar </Text>
          </TouchableOpacity>
        </View>
          {
            taskItems.map((item, index) =>{
              return (
                <TouchableOpacity key={index}>
                  <Text>{item}</Text> 
                </TouchableOpacity>
              )
            })
          }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center'
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'purple',
    padding: 5,
    borderRadius: 10
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flex2: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#000',
  }
});
