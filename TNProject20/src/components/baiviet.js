import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Header, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BinhLuan from './binhluan';

export default class baiviet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      databaiviet: [],
      isLoading: false,
      show: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.baiviet();
  }

  baiviet = () => {
    fetch('http://192.168.1.9/Server/GetBaiViet.php')
      .then(response => response.json())
      .then(json => {
        this.setState({
          databaiviet: json,
          isLoading: false,
          refreshing: false
        });
      })
      .catch(error => console.error(error))
      .finally(() => {});
  };

  openModalWithItem(item) {
    this.setState({
      show: true,
      IdBaiViet: item.IdBV,
    });
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        setTimeout(() => {
          this.baiviet();
        }, 1000);
      },
    );
  };

  _renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <View style={style.view_post}>
          <View style={style.title_post}>
            <Image
              style={style.post_img}
              source={require('../assets/Image/Van-ne.jpg')}
            />
            <Text style={style.txt_post}>{item.HoTen}</Text>
          </View>
          <View style={style.body_post}>
            <Text style={style.txt_body_post}>Tên món: {item.tenMonAn}</Text>
            <Text style={style.txt_body_post}>Khẩu phần: {item.khauPhan}</Text>
            <Text
              style={style.txt_body_post}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Nguyên liệu: {item.nguyenLieu}
            </Text>
            <Text
              style={style.txt_body_post}
              ellipsizeMode="tail"
              numberOfLines={3}>
              Cách nấu: {item.cachNau}
            </Text>
            <Text
              style={style.txt_ct}
              onPress={() =>
                this.props.navigation.navigate('Chi tiết món ăn', item)
              }>
              Xem chi tiết
            </Text>
            <Image style={style.img_post} source={{uri: item.hinhMinhHoa}} />
            {/* <Text style={style.txt_ct}>{item.yeuThich} lượt thích</Text> */}
          </View>
        </View>
        {/* <View style={style.group_btn}>
          <Button
            titleStyle={{color: '#7C8083', fontWeight: 'bold'}}
            buttonStyle={style.btn_post}
            title="Yêu thích"
            type="clear"
          />
          <Button
            titleStyle={{color: '#7C8083', fontWeight: 'bold'}}
            buttonStyle={style.btn_post}
            title="Bình Luận"
            type="clear"
            onPress={() => this.openModalWithItem(item)}
          />
          <Modal transparent={true} visible={this.state.show}>
            <Button
              buttonStyle={style.btn_close}
              icon={<FontAwesome5 name="times" color={'black'} size={20} />}
              onPress={() => this.setState({show: false})}
            />
            <BinhLuan IdMonAn={item.maMon} />
          </Modal>

          <Button
            titleStyle={{color: '#7C8083', fontWeight: 'bold'}}
            buttonStyle={style.btn_post}
            title="Chia sẽ"
            type="clear"
          />
        </View> */}
      </View>
    );
  };

  render() {
    const {databaiviet, isLoading} = this.state;
    console.log('phung', databaiviet);
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <View style={style.contrainer}>
          <FlatList
            data={databaiviet}
            extraData={this.state.refresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  contrainer: {
    flex: 1,
    paddingTop: 5,
  },
  post_img: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    margin: 5,
  },
  view_post: {
    borderTopWidth: 0.5,
    marginTop: 10,
    paddingTop: 10,
  },
  title_post: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt_post: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  body_post: {
    paddingTop: 5,
  },
  img_post: {
    width: '100%',
    height: 200,
  },
  txt_body_post: {
    fontSize: 18,
    margin: 5,
  },
  txt_ct: {
    paddingBottom: 5,
    paddingTop: 5,
    fontStyle: 'italic',
    margin: 5,
  },
  group_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 0.5,
  },
  btn_post: {
    width: 120,
    // backgroundColor: 'red'
  },
  txt_input: {
    borderColor: '#2F6791',
    borderBottomWidth: 1,
    fontSize: 20,
  },
  popup_bl: {
    flex: 1,
  },
  body_popup: {
    backgroundColor: 'white',
    // margin: 50,
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  btn_close: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
});
