import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Header, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Baiviet from '../components/baiviet';

class monmoi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView>
          <View style={style.bor_img}>
            <Image
              style={style.img}
              source={require('../assets/Image/Van-ne.jpg')}
            />
            <Button
              buttonStyle={style.btn_img}
              title="Hôm nay bạn ăn gì?"
              type="outline"
              onPress={() => this.props.navigation.navigate('Thêm bài viết')}
            />
          </View>
          <Baiviet navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

export default monmoi;

const style = StyleSheet.create({
  img: {
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    margin: 5,
  },
  bor_img: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingTop: 5,
  },
  btn_img: {
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
});
