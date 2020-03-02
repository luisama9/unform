import React from 'react';
import {Text, View} from 'react-native';
import {useTrackedState} from './store';

export default function Users() {
  const state = useTrackedState();
  const {users} = state;
  console.log('STATE', state);

  return (
    <View>
      <Text>Listagem</Text>
      {/* {users.map(user => (
        <Text key={user.email}>{user.email}</Text>
      ))} */}
    </View>
  );
}
