import React, {useRef, useState} from 'react';
import {Form} from '@unform/mobile';
import {Button} from 'react-native';
import Input from './input';
import AsyncStorage from '@react-native-community/async-storage';

export default function FormContainer({setStorage, getStorage}) {
  const formRef = useRef(null);
  const [users, setUsers] = useState(getStorage || '');

  const handleSubmit = async ({email, password}) => {
    setUsers([...users, {email, password}]);
    await setStorage(users);
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <Button title="Sign in" onPress={() => formRef.current.submitForm()} />
      </Form>
    </>
  );
}
26;
