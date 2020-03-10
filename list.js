import React from 'react';
import {Text, View} from 'react-native';
import {useTrackedState} from './store';

function List({users}) {
  const state = useTrackedState();
  console.log(state);

  return (
    <View>
      <Text>Listagem</Text>
      {users && users.map(user => <Text key={user.email}>{user.email}</Text>)}
    </View>
  );
}

export default React.memo(List);
