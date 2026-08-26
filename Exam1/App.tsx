import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import react, { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <CustomInput
      onChangeText={setEmail}
      value={email}
      placeholder={'Ingrese su correo'}
      type= 'email'
      />
      <CustomInput
      onChangeText={setPassword}
      value={password}
      placeholder={'Ingrese su contraseña'}
      type='password'
      />
      <CustomButton
      title="Boton 1"
      onPress={()=>{console.log("1")}}
      />
      
      <StatusBar style="auto" />
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
