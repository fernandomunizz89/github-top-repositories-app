import React, { Component } from 'react';
import {
  ScrollView,
  ListView,
  StatusBar,
  View,
} from 'react-native';
import { Spinner, Text } from 'native-base';
import axios from 'axios';
import Itens from './Itens';

export default class ListaItens extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = { listaItens: [],
      isLoading: true,
      dataSource: ds.cloneWithRows([]),
      pageSize: 1
     };
  }

  componentDidMount() {
    axios.get('https://api.github.com/search/repositories?q=language:Java&sort=stars&page=1')
      .then(response => { 
        this.setState({ listaItens: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items)
                      });
        }
      )
      .catch(() => { console.log('Erro ao recuperar os dados'); });
  }

  updateList = () => {
    //console.log('Entrou, sei lá!');
    this.setState({ pageSize: this.state.pageSize + 1 });
    console.log('pageSize: ' + this.state.pageSize);

    axios.get(`https://api.github.com/search/repositories?q=language:Java&sort=stars&page=${this.state.pageSize}`)
      .then(response => { 
        this.setState({ listaItens: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(response.data.items),
                        isLoading: false
                      });
        }
      )
      .catch(() => { console.log('Erro ao recuperar os dados'); });

      this.setState({ isLoading: false });
  }

  render() {

    const RenderFooter = () => {
    if (this.state.isLoading && this.state.dataSource._cachedRowCount > 30) {
        return (
            <Spinner color='#687FE6' />
        );
    } else {
        return null;
    }
  };

  return (
    <ListView dataSource={this.state.dataSource}
        initialListSize={30}
        onEndReachedThreshold={1}
        pageSize={30}
        scrollRenderAheadDistance={60}
        enableEmptySections={true}
        onEndReached={() => this.updateList()}
        renderFooter={() =>
            <RenderFooter />
        }
        renderRow={(rowData) =>
         <Itens key={rowData.name} item={rowData} />
        }
    />
    );  
  }


  /*
  render() {
    return (
      <View>
        <StatusBar backgroundColor='#333' />
        <ScrollView style={{ backgroundColor: '#DDD' }} >
          { this.state.listaItens.map(item => (
            <Itens key={item.name} item={item} />
            )
          ) }
        </ScrollView>
      </View>
    );
  }*/
}
