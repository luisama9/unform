import React from 'react';
import {Text, View} from 'react-native';
import {useTrackedState} from './store';

function List() {
  const users = useTrackedState();
  console.log('STATE', users);

  return (
    <View>
      <Text>Listagem</Text>
      {users && users.map(user => <Text key={user.email}>{user.email}</Text>)}
    </View>
  );
}

export default React.memo(List);
