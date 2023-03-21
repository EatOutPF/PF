import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, } from 'react-router-native'
import Main from './src/components/Main.jsx'


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Esta al es de prueba en React Native 12.</Text> */}
      <StatusBar style="auto" />
      <NativeRouter>
        <Main/>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
