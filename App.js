import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FormContainer from './form';
import List from './list';
import {useAsyncStorage} from './hook';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const [storageValue, updateStorage] = useAsyncStorage('users');
  console.log('APP', storageValue);
  return (
    <SafeAreaView style={styles.container}>
      <FormContainer setStorage={updateStorage} getStorage={storageValue} />
      <List getStorage={storageValue} />
    </SafeAreaView>
  );
};

export default App;
