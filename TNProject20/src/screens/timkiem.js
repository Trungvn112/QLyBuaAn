import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList,} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {ListItem} from 'react-native-elements';

export default class search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      datasoure: [],
      temp: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('http:/192.168.0.107/Server/GetAll.php')
      .then(response => response.json())
      .then(json => {
        this.setState({
          datasoure: json,
          temp: json,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.tenMonAn} onPress={() => this.props.navigation.navigate('Chi tiết món ăn', item)}
      leftAvatar={{
        source: item.hinhMinhHoa && {
          uri: item.hinhMinhHoa,
        },
      }}
      bottomDivider
      chevron
    />
  );

  renderHeader = () => {
    const {temp, datasoure} = this.state;
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        editable={true}
        value={this.state.search}
        onChangeText={this.updateSearch}
        autoFocus={true}
      />
    );
  };

  updateSearch = search => {
    this.setState({search}, () => {
      if ('' == search) {
        this.setState({
          datasoure: [...this.state.temp],
        });
        return;
      }
      this.state.datasoure = this.state.temp
        .filter(function(item) {
          return item.tenMonAn.includes(search);
        })
        .map(function({tenMonAn, hinhMinhHoa}) {
          return {tenMonAn, hinhMinhHoa};
        });
    });
  };

  render() {
    const {datasoure, isLoading} = this.state;
    return (
      <View>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          keyExtractor={this.keyExtractor}
          data={datasoure}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
