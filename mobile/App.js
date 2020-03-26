import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { Text, View } from 'react-native';

import Routes from './src/routes'


export default ()=>{
  const money = Intl.NumberFormat('pt-BR', { 
    style: 'currency',
    currency: 'BRL' 
  })
  return(
    <Routes />
  )
}
