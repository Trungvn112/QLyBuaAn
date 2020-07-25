import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Danhmuc from '../components/danhmuc';

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <ScrollView>
        <View style={style.home}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Món mới')}
            >
            <ImageBackground
              source={require('../assets/Image/img-home.jpg')}
              style={style.imgHome}>
              <Text style={style.txtImg}>Món ngon mỗi ngày</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <Danhmuc navigation={this.props.navigation} />

        <View style={style.home}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Món ăn gọi ý')}>
            <ImageBackground
              source={require('../assets/Image/img-home.jpg')}
              style={style.imgHome}>
              <Text style={style.txtImg}>Gợi ý hôm nay</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default home;

const style = StyleSheet.create({
  home: {
    height: 200,
  },
  imgHome: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtImg: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
