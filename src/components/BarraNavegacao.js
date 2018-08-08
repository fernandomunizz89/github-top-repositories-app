import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

const btnVoltar = require('../imgs/left-pointing-arrow.png');

export default class BarraNavegacao extends Component {
  render() {
	if (this.props.voltar && this.props.titulo) {
    return (   		
      <View style={styles.barraTitulo} >
        <TouchableHighlight
          onPress={() => {
            this.props.navigator.pop();
          }}
        >
        <Image style={styles.imgMenu} source={btnVoltar} />
        </TouchableHighlight>
        <Text style={styles.titulo} >{this.props.titulo}</Text>
      </View>
    );
	}
	return (
		<View style={styles.barraTitulo} >
			<Text style={styles.titulo} >Top Java Repositórios GitHub</Text>
		</View>
    );
  }
}

const styles = StyleSheet.create({
  barraTitulo: {
  backgroundColor: '#333',
  padding: 10,
  height: 60,
  flexDirection: 'row'
  },
  titulo: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
    paddingTop: 10
  },
  imgMenu: {
    margin: 10,
    marginBottom: 5,
    height: 20, 
    width: 20
  }
});
