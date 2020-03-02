import React, {useRef} from 'react';
import {Form} from '@unform/mobile';
import {Button} from 'react-native';
import {useDispatch} from './store';
import Input from './input';

export default function FormContainer() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = ({email, password}) => {
    dispatch({type: 'ADD_USER', email, password});
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
