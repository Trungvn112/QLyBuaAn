import React, {Component} from 'react';
import {View, Text, Alert, Modal, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class ThemBA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalVisible: false,
      txtGC: '',
    };
  }

  openModalWithItem() {
    this.setState({
      show: true,
    });
  }

  them = () => {
    const Ma = this.props;
    const {txtGC} = this.state;
    fetch('http://192.168.1.9/Server/IsertBuaAn.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        IdDM: 1,
        TenBA: 'Sáng',
        maMon: Ma.id,
        GhiChu: txtGC,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson);
        console.log(responseJson);
        // this.props.navigation.navigate('Món mới')
      })
      .catch(err => {
        console.error(err);
      });
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{height: 300, width: 300, backgroundColor: 'gray', justifyContent: 'space-between', flexDirection: 'column'}}>
            <Button
              buttonStyle={style.btn_close}
              icon={<FontAwesome5 name="times" color={'black'} size={20} />}
              onPress={() => {
                this.setModalVisible(!modalVisible);
              }}
            />
            <View>
              <Input placeholder="Ghi chú" multiline={true} onChangeText={txtGC => this.setState({txtGC})}  />
            </View>
            <Button
              buttonStyle={{height: 30, backgroundColor: 'green'}}
              title="Lưu"
              onPress={() => {
                this.them();
              }}
            />
          </View>
        </Modal>
        <Button
          title="Thêm"
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  modalVisible: {
    margin: 20,
    // backgroundColor: 'gray',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn_close: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
});
