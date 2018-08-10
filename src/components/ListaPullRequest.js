import React, { Component } from 'react';
import { ListView, StatusBar, View } from 'react-native';
import { Spinner } from 'native-base';
import axios from 'axios';
import ItemPullRequest from './ItemPullRequest';

export default class ListaPullRequest extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = { listaItemPullRequest: [],
      isLoading: true,
      dataSource: ds.cloneWithRows([]),
      pageSize: 1
    };

     this.dataList = [];
  }


  componentDidMount() {
    axios.get(`${this.props.url}${this.props.complemento}?page=1&per_page=30`)
      .then(response => {
        let items = response.data;
        items.forEach(item => {
          this.dataList.push(item);
        });
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataList) }); 
      }
    )
    .catch(() => { console.log('Erro ao recuperar os dados'); });
  }

  updateList = () => {
    this.setState({ pageSize: ++this.state.pageSize, isLoading: true });
    axios.get(`${this.props.url}${this.props.complemento}?page=${this.state.pageSize}&per_page=30`)
      .then(response => { 
        let items = response.data;
        items.forEach(item => {
          this.dataList.push(item);
        });
        this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataList) });
        }
      )
      .catch(() => { console.log('Erro ao recuperar os dados'); });
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
              <ItemPullRequest key={rowData.title} item={rowData} />
            }
        />
      </View>
    );  
  }
}
