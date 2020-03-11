import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Button, TextInput} from 'react-native';

import {useForm} from 'react-hook-form';
import {useAsyncStorage} from '@react-native-community/async-storage';

import {useDispatch} from './store';

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

export default function FormContainer({loadStorage}) {
  const {register, handleSubmit, setValue, reset, watch} = useForm({
    defaultValues,
  });
  const {removeItem} = useAsyncStorage('users');
  const dispatch = useDispatch();
  const values = watch(); // triggers re-render

  const onSubmit = useCallback(
    async ({email, password}) => {
      dispatch({type: 'ADD_USER', email, password});
      reset(defaultValues);
      loadStorage();
    },
    [dispatch, loadStorage, reset],
  );

  const handleReset = async () => {
    try {
      await removeItem();
      loadStorage();
    } catch (error) {}
  };

  useEffect(() => {
    register({name: 'email'});
    register({name: 'password'});
  }, [register]);

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  return (
    <>
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
    </>
  );
}
