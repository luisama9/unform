import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const useAsyncStorage = (key, defaultValue) => {
  const [storageValue, updateStorageValue] = useState(defaultValue);
  const [updated, setUpdated] = useState(false);

  const getStorageValue = useCallback(
    async function getStorageValue() {
      let value = defaultValue;
      try {
        value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
      } catch (e) {
      } finally {
        updateStorageValue(value);
        setUpdated(true);
      }
    },
    [defaultValue, key],
  );

  async function updateStorage(newValue) {
    try {
      if (newValue === null) {
        await AsyncStorage.removeItem(key);
      } else {
        const value = JSON.stringify(newValue);
        await AsyncStorage.setItem(key, value);
      }
    } catch (e) {
    } finally {
      setUpdated(false);
      getStorageValue();
    }
  }

  useEffect(() => {
    getStorageValue();
  }, [getStorageValue, updated]);

  return [storageValue, updateStorage];
};
