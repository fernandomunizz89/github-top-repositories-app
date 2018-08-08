import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const star = require('../imgs/rate-star-button.png');
const fork = require('../imgs/code-fork-symbol.png');

export default class Itens extends Component {

  constructor(props) {
    super(props);

    this.state = { listaItemPullRequest: [] };
  }

  render() {
    return (
      <TouchableHighlight 
        onPress={() => { Actions.listaPullRequest({ url: this.props.item.url, complemento: '/pulls' }); }}
      >
        <View style={styles.item} >
          <View style={styles.txtContainer} >
            <Text style={styles.txtTitulo} >{ this.props.item.name }</Text>
            <Text numberOfLines={3} style={styles.txtDescricao} >
              { this.props.item.description }
            </Text>
            <View style={styles.statistics} >
              <View style={styles.statistics} >
                <Image style={styles.statisticsImage} source={star} />
                <Text style={styles.statisticStar} >{ this.props.item.stargazers_count }</Text>
               </View>
               <View style={styles.statistics} >
                <Image style={styles.statisticsImage} source={fork} />
                <Text style={styles.statisticFork} >{ this.props.item.forks_count }</Text>
              </View>
            </View>
          </View>
          <View style={styles.imagemContainer}>
            <Image style={styles.imagem} source={{ uri: this.props.item.owner.avatar_url }} />
            <Text style={styles.txtDescricao} >{ this.props.item.owner.login }</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#DDD',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 0,
    margin: 0
  },
  statistics: {
   flexDirection: 'row',
   marginTop: 5,
   marginRight: 5,
   justifyContent: 'space-between'
  },
  statisticsImage: {
    height: 23, 
    width: 23
  },
  txtTitulo: {
    color: 'steelblue',
    fontSize: 20,
    marginBottom: 5
  },  
  txtDescricao: {
    fontSize: 15
  },
  statisticStar: {
    fontSize: 18,
    color: '#FFC300',
    fontWeight: 'bold'
  },
  statisticFork: {
    fontSize: 18,
    color: '#FFC300',
    fontWeight: 'bold'
  },
  imagem: {
    height: 120, 
    width: 120,
    borderRadius: 5,
  },
  imagemContainer: {
    alignItems: 'center'
  },
  txtContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between'
  }
});
