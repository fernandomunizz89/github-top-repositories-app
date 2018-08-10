import React, { Component } from 'react';
import { ListView, StatusBar, View } from 'react-native';
import { Spinner } from 'native-base';
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

     this.dataList = [];
  }

  componentDidMount() {
    axios.get('https://api.github.com/search/repositories?q=language:Java&sort=stars&page=1&per_page=30')
      .then(response => {
        let items = response.data.items;
        items.forEach(item => {
          this.dataList.push(item);
        });

        console.log(this.dataList);
        this.setState({ // listaItens: response.data.items,
                        dataSource: this.state.dataSource.cloneWithRows(this.dataList),
                      });
        }
      )
      .catch(() => { console.log('Erro ao recuperar os dados'); });
  }

  updateList = () => {
    this.setState({ pageSize: (this.state.pageSize + 1), isLoading: true });
    axios.get(`https://api.github.com/search/repositories?q=language:Java&sort=stars&page=${this.state.pageSize}&per_page=30`)
      .then(response => { 
        let items = response.data.items;
        items.forEach(item => {
          this.dataList.push(item);
        });

        this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataList) });
        }
      )
      .catch(() => { console.log('Erro ao recuperar os dados'); });
      // this.setState({ isLoading: false });
  }

  render() {
    const RenderFooter = () => {
      if (this.state.isLoading) {
        return (
          <Spinner color='#687FE6' />
        );
      } else {
          return null;
      }
    };

    return (
      <View>
        <StatusBar backgroundColor='#333' />
        <ListView dataSource={this.state.dataSource}
            initialListSize={30}
            onEndReachedThreshold={1}
            pageSize={30}
            scrollRenderAheadDistance={30}
            enableEmptySections={true}
            onEndReached={() => this.updateList()}
            renderFooter={() =>
                <RenderFooter />
            }
            renderRow={(rowData) =>
              <Itens key={rowData.name} item={rowData} />
            }
        />
      </View>
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
