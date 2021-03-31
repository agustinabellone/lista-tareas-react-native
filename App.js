import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Alert
} from "react-native";
import Task from "./components/Task";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if(task) {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    } else {
      Alert.alert("Alerta", "La tarea no puede estar en blanco")
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Lista de Tareas</Text>
        <View style={styles.items}>
        <ScrollView> 
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
          </ScrollView>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Escribir tarea..."}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
          <Icon name="plus" style={styles.icon} size={20} />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED"
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    height: 550
  },
  sectionTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 20,
    paddingTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: '#E8EAED'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 280,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    fontSize: 15
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#29bb89",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  icon: {
    color: 'white',
  }
});
