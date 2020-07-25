import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {apiLogin} from '../Api';
import {Input, Button} from 'react-native-elements';
const {width: WIDTH} = Dimensions.get('window');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TenDN: '',
      // MatKhau: '',
      // UserId: '',
      data: [],
    };
  }

  handleChange = param => {
    console.log('check handle:', param);
    this.setState({
      ...param,
    });
  };

  handleLogin = async () => {
    const {TenDN = '', MatKhau = ''} = this.state;
    const req = {
      TenDN,
      MatKhau,
    };
    const resLogin = await apiLogin(req);
    console.log('dsadsa', resLogin);
    if (resLogin.length > 0) {
      this.props.navigation.navigate('Home');
    } else {
      alert('Tài Khoản Mật Không Chính Xác!');
    }
  };

  
  // handleLogin = async param => {
  //   if (param == 'Loading') {
  //     let kq = await apiLogin(this.state.TenDN, this.state.MatKhau);
  //     // console.log('object', kq);
  //     if (kq.status == 1) {
  //       let userLogin = {
  //         TenDN: this.state.TenDN,
  //       };
  //       AsyncStorage.setItem('userLogin', JSON.stringify(userLogin));
  //       // this.props.navigation.navigate(param)
  //       this.props.navigation.navigate('Home')
  //       console.log('dung', userLogin);
  //     } else {
  //       Alert.alert('Loi');
  //     }
  //   } else {
  //     // this.props.navigation.navigate(param)
  //     console.log('sai');
  //   }
  // };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.container}>
          <Input
            containerStyle={{width: WIDTH - 55}}
            placeholder="Tài khoản"
            onChangeText={text => this.handleChange({TenDN: text})}
          />

          <Input
            containerStyle={{width: WIDTH - 55}}
            placeholder="Mật khẩu"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={text => this.handleChange({MatKhau: text})}
          />
          <Button
            buttonStyle={{width: WIDTH - 55}}
            title="Đăng nhập"
            onPress={() => this.handleLogin()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
