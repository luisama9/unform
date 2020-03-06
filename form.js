import React from 'react';
import {StyleSheet, TextInput, Button} from 'react-native';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    margin: 5,
  },
});

export default function FormContainer({
  emailRef,
  email,
  setEmail,
  password,
  setPassword,
  handleReset,
  handleSubmit,
}) {
  return (
    <>
      <Button title="Resetar" onPress={handleReset} />
      <TextInput
        ref={emailRef}
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </>
  );
}
