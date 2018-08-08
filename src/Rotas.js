import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ListaItens from './components/ListaItens';
import ListaPullRequest from './components/ListaPullRequest';

const Rotas = () => (
	<Router 
		sceneStyle={{ paddingTop: 60 }} 
		navigationBarStyle={{ backgroundColor: '#333' }} 
		titleStyle={{ color: 'white', fontSize: 20 }}
		barButtonIconStyle={{ tintColor: 'white' }}
	>
		<Scene key='listaItens' component={ListaItens} initil title='JavaPops GitHub' />
		<Scene key='listaPullRequest' component={ListaPullRequest} title='Pull Requests' />
	</Router>
);

export default Rotas;
