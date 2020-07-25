import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Share,
  Linking,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Binhluan from '../components/binhluan1';
import {Button} from 'react-native-elements';

export default class chitietmonan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TxtBinhluan: '',
    };
  }

  SET = async params => {
    console.log('ckeck params', params);
    await AsyncStorage.setItem('arr').then(arr2 => {
      if (arr2 !== null) {
        let arr = [];
        arr = JSON.parse(arr2);
        arr.push(params);
        console.log('arr', arr);
        try {
          AsyncStorage.getItem('arr', JSON.stringify(arr));
          alert('okwe');
          // console.log('arr', arr);
          // console.log("dulieu",params)
        } catch (error) {
          // Error saving data
          console.log('FALE');
        }
      }
    });
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Van phung xin  chao!',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          URL('https://www.facebook.com/profile.php?id=100012367992930');
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        URL('https://www.facebook.com/profile.php?id=100012367992930');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {
      maMon,
      tenMonAn,
      hinhMinhHoa,
      nguyenLieu,
      cachNau,
    } = this.props.route.params;
    // const item = this.props.route.params;
    // console.log("item:",this.props)
    // console.log('check:', this.props);
    let {goiymonan, txtTitle, txtND, imgback} = style;
    return (
      <View style={{marginBottom: 20, flex: 1}}>
        <ScrollView>
          <View style={style.container}>
            <FontAwesome5.Button
              name="heart"
              style={style.iconStyle}
              solid
              size={40}
              onPress={() => this.SET(this.props.route.params)}
            />
            <FontAwesome5.Button
              name="share-alt-square"
              size={40}
              onPress={() => onShare()}
            />
          </View>
          <View style={goiymonan}>
            <Text style={txtTitle}>{tenMonAn}</Text>
            <Image style={imgback} source={{uri: hinhMinhHoa}} />
            <Text style={txtTitle}>Nguyên liệu</Text>
            <Text style={txtND}>{nguyenLieu}</Text>
            <Text style={txtTitle}>Cách nấu</Text>
            <ScrollView>
              <Text style={txtND}>{cachNau}</Text>
            </ScrollView>
          </View>

          <View>
            <Binhluan IdMonAn={maMon} />
          </View>

          <View style={style.upBL}>
            <TextInput
              style={style.txt_input}
              placeholder="Bạn thấy món ăn này như thế nào?"
              onChangeText={TxtBinhluan => this.setState({TxtBinhluan})}
            />
            <Button
              buttonStyle={style.btn_bl}
              icon={
                <FontAwesome5 name="angle-right" size={30} color="#AFBCC5" />
              }
              onPress={() => this.InsertBinhLuan(maMon)}
            />
          </View>
          <View>
            <Text>Các món liên quan</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
  InsertBinhLuan = maMon => {
    // const id = this.props;
    console.log('object', maMon);
    const {TxtBinhluan} = this.state;
    if (this.state.TxtBinhluan.length == 0) {
      alert('Nhap binh luan!');
      return;
    }
    fetch('http://172.16.29.201/Server/IsertBinhLuan.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NoiDung: TxtBinhluan,
        IdMonAn: maMon,
        UserId: 2,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert('Them thanh coong');
        console.log(responseJson);

        // this.setState(
        //   {
        //     refreshing: true,
        //   },
        //   () => {
        //     setTimeout(() => {
        //       this.getData();
        //     }, 1000);
        //   },
        // );
      })
      .catch(err => {
        console.error(err);
      });
  };
}

const style = StyleSheet.create({
  goiymonan: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  txtTitle: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  txtND: {
    fontSize: 20,
  },
  imgback: {
    margin: 10,
    height: 200,
    width: '100%',
  },
  iconStyle: {
    color: 'red',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 15,
    top: 15,
  },
});
