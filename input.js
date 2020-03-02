import React, {useRef, useEffect} from 'react';
import {Text, TextInput, StyleSheet} from 'react-native';
import {useField} from '@unform/core';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    margin: 5,
  },
});

function Input({name, label, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value});
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({text: ''});
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Text>{label}</Text>}

      <TextInput
        style={styles.input}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}

export default Input;
