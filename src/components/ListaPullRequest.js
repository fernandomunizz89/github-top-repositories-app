import React, { Component } from 'react';
import {
  ScrollView,
  StatusBar,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ItemPullRequest from './ItemPullRequest';

export default class ListaPullRequest extends Component {

  constructor(props) {
    super(props);

    this.state = { listaItemPullRequest: [] };
  }


  componentWillMount() {
    console.log(this.props.url + this.props.complemento);
    axios.get(this.props.url + this.props.complemento)
      .then(response => { this.setState({ listaItemPullRequest: response.data }); })
      .catch(() => { console.log('Erro ao recuperar os dados'); });
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor='#333' />
        <ScrollView style={{ backgroundColor: '#DDD' }} >
          { this.state.listaItemPullRequest.map(item => (
            <ItemPullRequest key={item.title} item={item} />
          )) }
        </ScrollView>
      </View>
    );
  }
}
