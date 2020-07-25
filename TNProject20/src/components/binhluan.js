import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import {Header, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {apiGetBinhLuan} from '../Api';

export default class binhluan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBL: [],
      isLoading: false,
      TxtBinhluan: '',
    };
  }

  async componentDidMount() {
    this.getData();
  }
  async getData() {
    const route = this.props;
    console.log('check item:', route);
    let bl = await apiGetBinhLuan(route);
    this.setState({
      dataBL: bl,
    });
  }

  _renderItem = ({item}) => {
    return (
      <ScrollView>
        <View style={style.popup_bl}>
          <View style={style.popup_box}>
            <Image
              style={style.post_img}
              source={require('../assets/Image/Van-ne.jpg')}
            />
            <View style={style.box_cmt}>
              <Text style={style.txt_title_ten}>{item.HoTen}</Text>
              <Text style={style.txt_noidung} style={{paddingLeft: 10}}>
                {item.NoiDung}{' '}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    const {dataBL} = this.state;
    console.log('check bl', dataBL);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.body_popup}>
          <FlatList
            data={dataBL}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />

          <View style={style.upBL}>
            <TextInput
              autoFocus={true}
              style={style.txt_input}
              placeholder="Bạn thấy món ăn này như thế nào?"
              onChangeText={TxtBinhluan => this.setState({TxtBinhluan})}
            />
            <Button
              buttonStyle={style.btn_bl}
              icon={
                <FontAwesome5 name="angle-right" size={30} color="#AFBCC5" />
              }
              onPress={() => this.InsertBinhLuan()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  InsertBinhLuan = () => {
    const {TxtBinhluan} = this.state;
    const id = this.props;
    if (this.state.TxtBinhluan.length == 0) {
      alert('Nhap binh luan!');
      return;
    }
    fetch('http://192.168.0.107/Server/IsertBinhLuan.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NoiDung: TxtBinhluan,
        IdMonAn: id.IdMonAn,
        UserId: 2,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert('Them thanh coong');
        console.log(responseJson);
       
        this.setState(
          {
            refreshing: true,
          },
          () => {
            setTimeout(() => {
              this.getData();
            }, 1000);
          },
        );
      })
      .catch(err => {
        console.error(err);
      });
  };
}

const style = StyleSheet.create({
  popup_bl: {
    flex: 1,
  },
  body_popup: {
    backgroundColor: 'white',
    // margin: 50,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  popup_box: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  post_img: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    margin: 5,
  },
  btn_close: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  upBL: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  txt_input: {
    borderColor: '#2F6791',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  btn_bl: {
    backgroundColor: 'white',
    marginLeft: 5,
  },
  box_cmt: {
    marginLeft: 10,
    backgroundColor: '#AFBCC5',
    borderRadius: 10,
    marginTop: 10,
  },
  txt_title_ten: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 15,
  },
});
