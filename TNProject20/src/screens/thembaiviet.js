import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  Picker,
} from 'react-native';
import {Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {apiGetLoaiMonAn} from '../Api';

const {width: WIDTH} = Dimensions.get('window');
export default class thembaiviet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasoure: [],
      isLoading: true,
      TxtTenMon: '',
      TxtNguyenLieu: '',
      TxtCachNau: '',
      TxtKhauPhan: '',
      LinkAnhL: '',
      txtLoai: '',
    };
  }

  async componentDidMount() {
    fetch('http://192.168.1.9/Server/GetLoaiMonAn.php')
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

  InsertBaiViet = () => {
    const {TxtTenMon} = this.state;
    const {TxtNguyenLieu} = this.state;
    const {TxtCachNau} = this.state;
    const {TxtKhauPhan} = this.state;
    const {LinkAnhL} = this.state;
    const {txtLoai} = this.state;
    fetch('http://192.168.1.9/Server/Insert.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        TenMon: TxtTenMon,
        MaLoai: txtLoai,
        NguyenLieu: TxtNguyenLieu,
        CachNau: TxtCachNau,
        KhauPhan: TxtKhauPhan,
        HinhMinhHoa: LinkAnhL,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
        console.log(responseJson);
        this.props.navigation.navigate('Món mới')
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const {datasoure} = this.state;
    console.log('Dsadas', datasoure);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            style={style.txt_input}
            placeholder="Tên món ăn"
            onChangeText={TxtTenMon => this.setState({TxtTenMon})}
          />
          <Picker
            selectedValue={this.state.txtLoai}
            onValueChange={(value, index) =>
              this.setState({txtLoai: value})
            }>
            {datasoure.map(item => (
              <Picker.Item value={item.maLoai} label={item.tenLoai} />
            ))}
          </Picker>
          <TextInput
            style={style.txt_input}
            placeholder="Khẩu phần"
            keyboardType={'number-pad'}
            onChangeText={TxtKhauPhan => this.setState({TxtKhauPhan})}
          />
          <TextInput
            style={style.txt_input}
            multiline={true}
            numberOfLines={4}
            placeholder="Nguyên liệu"
            onChangeText={TxtNguyenLieu => this.setState({TxtNguyenLieu})}
          />
          <TextInput
            style={style.txt_input}
            multiline={true}
            numberOfLines={4}
            placeholder="Cách nấu"
            onChangeText={TxtCachNau => this.setState({TxtCachNau})}
          />
          <TextInput
            style={style.txt_input}
            multiline={true}
            numberOfLines={4}
            placeholder="Link ảnh"
            onChangeText={TxtCachNau => this.setState({TxtCachNau})}
          />
          {/* <Image /> */}
          {/* <Button title="Chọn ảnh" /> */}
          <Button title="Đăng" onPress={this.InsertBaiViet} />
          {/* <Text style={style.txt} onPress={this.InsertBaiViet}>Đăng</Text> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const style = StyleSheet.create({
  txt_input: {
    borderColor: '#2F6791',
    borderBottomWidth: 1,
    fontSize: 20,
  },
});
