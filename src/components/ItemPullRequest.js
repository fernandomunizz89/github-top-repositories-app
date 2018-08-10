import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  Linking
} from 'react-native';
import Moment from 'moment';

export default class ItenPullRequest extends Component {
  
  constructor(props) {
    super(props);

    this.state = { listaItemPullRequest: [] };
  }

  render() {
    return (
      <View style={styles.item} >
        <View style={styles.txtContainer} >
          <Text numberOfLines={1} style={styles.txtTitulo} >{ this.props.item.title }</Text>
          <Text style={styles.txtData} >
            { Moment(this.props.item.updated_at).format('DD/MM/YYYY  HH:mm:ss') }
          </Text>
          <Text numberOfLines={3} style={styles.txtDescricao} >{ this.props.item.body }</Text>

        </View>
        <View style={styles.imagemContainer}>
          <View style={styles.imagemContainer}>
            <Image style={styles.imagemUser} source={{ uri: this.props.item.user.avatar_url }} />
            <Text style={styles.txtUser} >{ this.props.item.user.login }</Text>
          </View>
          <View style={styles.btnVisualizar}>
            <Button title='Ver no GitHub' onPress={() => { Linking.openURL(this.props.item.html_url); }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: '#CCC',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    marginBottom: 0,
    margin: 0
  },
  txtTitulo: {
    color: 'steelblue',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold'
  },  
  txtDescricao: {
    fontSize: 15,
  },
  txtData: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  txtUser: {
    color: 'steelblue',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  },
  imagemUser: {
    height: 50, 
    width: 50,
    borderRadius: 100,
  },
  btnVisualizar: {
    alignItems: 'flex-end'
  },
  imagemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  },
  txtContainer: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between'
  }
});
