import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {useAsyncStorage} from '@react-native-community/async-storage';

import {Provider} from './store';

import FormContainer from './form';
import List from './list';

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const {getItem} = useAsyncStorage('users');
  const [users, setUsers] = useState([]);

  // console.log('RENDER');

  const loadStorage = useCallback(async () => {
    try {
      let preloadedValue = JSON.parse(await getItem());

      if (preloadedValue === null) {
        preloadedValue = [];
      }

      if (JSON.stringify(users) !== JSON.stringify(preloadedValue)) {
        return setUsers(preloadedValue);
      }
    } catch (error) {}
  }, [getItem, users]);

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <FormContainer
          users={users}
          setUsers={setUsers}
          loadStorage={loadStorage}
        />
        <List users={users} />
      </SafeAreaView>
    </Provider>
  );
};

export default React.memo(App);
