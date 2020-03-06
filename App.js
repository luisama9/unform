import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Button, TextInput} from 'react-native';
import {useForm} from 'react-hook-form';
import {useAsyncStorage} from '@react-native-community/async-storage';
import List from './list';

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

const defaultValues = {
  email: '',
  password: '',
};

const App = () => {
  const {register, handleSubmit, setValue, reset, watch} = useForm({
    defaultValues,
  });
  const {getItem, setItem, removeItem} = useAsyncStorage('users');
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);
  const values = watch(); // triggers re-render

  console.log('USER', users);

  const loadStorage = useCallback(async () => {
    const item = JSON.parse(await getItem());
    (await item) !== null && setUsers(item);
  }, [getItem]);

  const onSubmit = async ({email, password}) => {
    await setItem(JSON.stringify([...users, {email, password}]));

    reset(defaultValues);
    setUpdated(!updated);
  };

  const handleReset = async () => {
    try {
      await removeItem();
      setUpdated(!updated);
    } catch (error) {}
  };

  useEffect(() => {
    register({name: 'email'});
    register({name: 'password'});
  }, [register]);

  useEffect(() => {
    loadStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Resetar" onPress={handleReset} />
      <TextInput
        value={values.email}
        style={styles.input}
        onChangeText={text => setValue('email', text)}
      />
      <TextInput
        value={values.password}
        style={styles.input}
        onChangeText={text => setValue('password', text)}
      />
      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
      <List users={users} />
    </SafeAreaView>
  );
};

export default App;
