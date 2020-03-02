import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import FormContainer from './form';
import Users from './users';
import {Provider} from './store';

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  // const state = useTrackedState();

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <FormContainer />
        <Users />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
