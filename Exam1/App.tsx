import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import CustomButton from './src/components/CustomButton';
import CustomInput from './src/components/CustomInput';
import react, { useState, useEffect } from 'react';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

export default function App() {
  const [contador, setContador] = useState <number>(0);
  const [ultimoMensaje, setUtlimoMensaje] = useState <string> ('Esperando interaccion.....');
  /**
   * 1.useEffect sin arreglo de dependencias
   * Definición:
   ESte hook se ejecuta automaticamente despues del primer render,
   y luego vuelve a correr cada vez que le componente se re-renderiza
   ya sea porque cambio un estado o una prop.
   * ¿Cuándo usarlo?:
   * Se recomienda usarlo solo para cosas como monitoreo, 
   * logging global o depuración mientras desarrollas. Hay que tener cuidado con él, 
   * porque si metes lógica pesada ahí adentro puede afectar el rendimiento, 
   * o incluso generar bucles infinitos si actualizas el estado dentro del mismo hook.
   */

   useEffect(()=> {
      const mensaje = `[Render Global] El componente se ha renderizado. (Contador actual: ${contador})`;
      console.log(mensaje);
   });

   /**
   * 2.useEffect con arreglo de dependencias 
   * Definición:
   Este hook se ejecuta cuando el componente se monta,
   y después de eso solo vuelve a correr cuando cambia el valor de las variables
   que se pusieron en el arreglo de dependencias en este caso, contador.
   *
   Comportamiento con arreglo vacío ([]):
   * Si le pasas un arreglo vacío [], el efecto se ejecuta una sola vez, 
   justo cuando el componente aparece en pantalla. 
   Es ideal para cosas como peticiones a APIs, 
   suscripciones o configuraciones iniciales.
   *
   * ¿Cuándo usarlo con dependencias?:
   Cuando necesitas que tu componente reaccione a cambios en variables específicas, 
   por ejemplo para autoguardado, validar un campo mientras el usuario escribe,
   o mantener sincronizados varios estados.
   */

   useEffect(()=>{
      const mensaje = `[Efecto Contador] El contador cambio a: ${contador}`;
      console.log(mensaje);
      setUtlimoMensaje(mensaje);
   }, [contador]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarea: useEffect </Text>
      
      <View style={styles.card}>
        <Text style={styles.counterText}>Contador: {contador}</Text>
        <Button 
          title="Incrementar contador" 
          onPress={() => setContador(prev => prev + 1)} 
        />
      </View>

      <View style={styles.logBox}>
        <Text style={styles.logTitle}>Último log de efecto especifico:</Text>
        <Text style={styles.logText}>{ultimoMensaje}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height:2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },

  counterText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
  logBox: {
    backgroundColor: '#e8ecef',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  logText: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'monospace',
  },
});