import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class headerRight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={style.contai}>
        <FontAwesome5
          name="search"
          size={30}
          solid
          style={style.iconStyle}
          onPress={() => {
            this.props.navigation.navigate('Tìm kiếm');
          }}
        />
        <FontAwesome5
          name="home"
          size={30}
          solid
          style={style.iconStyle}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
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
