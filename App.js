import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native'
import api from './src/services/api';

export default function App(){
const [cep, setCep] = useState('');
const inputRef = useRef(null);
const [cepUser, setCepUser] = useState(null);

function limpar(){
  setCep('')
  inputRef.current.focus();
  setCepUser(null)
}

async function buscar(){
  if(cep === ''){
    alert('Digite um cep válido!')
    setCep('')
    inputRef.current.focus()
    return;
  }

  try {
    const response = await api.get(`${cep}/json`)
    Keyboard.dismiss();
    //console.log(response.data);  
    setCepUser(response.data)
  } catch (error) {
    console.log(error);
  }

  
}

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center'}}>
      <Text style={styles.textoContainer}>Digite o CEP que deseja</Text>
      <TextInput
      placeholder='EX: 63180000'
      style={styles.input}
      value={cep}
      onChangeText={(texto)=>setCep(texto)}
      keyboardType='numeric'
      ref={inputRef}
      />
      </View>

      <View style={styles.containerBtn}>
      <TouchableOpacity 
      onPress={buscar}
      style={[styles.botao, {backgroundColor: '#1d75cd'}]}>
        <Text style={styles.textoBtn}>BUSCAR</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={limpar}
      style={[styles.botao, {backgroundColor: '#cd3e1d'}]}>
        <Text style={styles.textoBtn}>LIMPAR</Text>
      </TouchableOpacity>
      </View>

      {cepUser &&
      <View style={styles.containerResultado}>
      <Text style={styles.resultado}>CEP: {cepUser.cep}</Text>
      <Text style={styles.resultado}>LOGRADOURO: {cepUser.logradouro}</Text>
      <Text style={styles.resultado}>BAIRRO: {cepUser.bairro}</Text>
      <Text style={styles.resultado}>CIDADE: {cepUser.localidade}</Text>
      <Text style={styles.resultado}>ESTADO: {cepUser.uf}</Text>
    </View>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#c2c2c2'
  },
  textoContainer:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30
  },
  input:{
    backgroundColor:'#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 20,
    marginTop: 20
  },
  containerBtn:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop: 20
  },
  botao:{
    height: 50,
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5
  },
  textoBtn:{
    fontSize: 20,
    color:'#FFF'
  },
  containerResultado:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  resultado:{
    fontSize: 22
  }

})