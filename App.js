/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    margin: 5,
  },
});

const App = () => {
  const {getItem, setItem, removeItem} = useAsyncStorage('users');
  const [users, setUsers] = useState([]);
  const [newValue, setNewValue] = useState('');

  const loadStorage = useCallback(async () => {
    const item = JSON.parse(await getItem());
    await setUsers(item === null ? [] : item);
  }, [getItem]);

  const handleSubmit = async () => {
    await setItem(JSON.stringify([...users, newValue]));
    setNewValue('');
    loadStorage();
  };

  const handleReset = async () => {
    try {
      await removeItem();
      loadStorage();
    } catch (error) {}
  };

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Button title="Resetar" onPress={handleReset} />
        <TextInput
          style={styles.input}
          value={newValue}
          onChangeText={text => setNewValue(text)}
        />
        <Button title="Enviar" onPress={handleSubmit} />
        <View>
          <Text>Listagem</Text>
          {users && users.map(user => <Text key={user}>{user}</Text>)}
        </View>
      </>
    </SafeAreaView>
  );
};

export default App;
