import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class headerLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.contai}>
        <FontAwesome5
          name={'bars'}
          size={30}
          solid
          onPress={this.props.navigation.openDrawer}
          style={style.iconStyle}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  contai: {
   
  },
  iconStyle: {
    paddingBottom: 20,
  },
});
