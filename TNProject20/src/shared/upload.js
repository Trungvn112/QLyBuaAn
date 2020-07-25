import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class upload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={style.contai}>
        <FontAwesome5
          name={'warehouse'}
          size={30}
          solid
          onPress={() => this.props.navigation.navigate('Chọn món')}
          style={style.iconStyle}
        />
        <FontAwesome5
          name="home"
          size={30}
          onPress={() =>  this.props.navigation.navigate('Home')}
          style={{paddingBottom: 20}}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  contai: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconStyle: {
    paddingBottom: 20,
  },
});
