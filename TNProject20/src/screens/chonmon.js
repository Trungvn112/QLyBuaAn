import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Ansang from '../components/ansang';
import Antrua from '../components/antrua';


class chonmon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasoure:[]
    };
  }

  async componentDidMount() {
    fetch('http://192.168.1.9/Server/GetTongKalo.php')
      .then(response => response.json())
      .then(json => {
        this.setState({
          datasoure: json,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {datasoure}=this.state;
    const item = datasoure;
    console.log("check kalo",datasoure)
    return (
      <View style={{flex:1}} >
        <View style={{height: 500}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Món ăn sáng</Text>
        <Ansang navigation={this.props.navigation} />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Món ăn trưa</Text>
        <Antrua navigation={this.props.navigation} />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tổng số kalo trong ngày: {400}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>Vượt quá mức Kalo trong ngày!</Text>
        </View>
        <View>
        {/* <FlatList
          data={datasoure}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.TenBA}, {item.totalprice}
            </Text>
          )}
        /> */}
        </View>
      </View>
    );
  }
}

export default chonmon;
