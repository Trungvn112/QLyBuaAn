import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import ThemBuaAn from '../../components/ThemBA';


const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

class sang extends Component {
  formatData = (datasoure, numColumns) => {
    const totalRows = Math.floor(datasoure.length / numColumns);
    let totalLastRow = datasoure.length - totalRows * numColumns;

    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      datasoure.push({key: 'blank', empty: true});
      totalLastRow++;
    }
    return datasoure;
  };

  constructor(props) {
    super(props);
    this.state = {
      datasoure: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    fetch('http://192.168.1.9/Server/GetMonAnSang.php')
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

  _renderItem = ({item}) => {
    let {itemStyle, imgbackground, itemText} = style;
    return (
      <View style={itemStyle}>
      <View style={{height: 160}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chi tiết món ăn', item)}>
          <ImageBackground source={{uri: item.hinhMinhHoa}} style={imgbackground}>
            <Text style={itemText}>{item.tenMonAn}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{height: 50}}>
         <ThemBuaAn id = {item.maMon}/>
        </View>
      </View>
    );
  };

  render() {
    let {contrainer} = style;
    const {datasoure, isLoading} = this.state;
    return (
      <View style={contrainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={this.formatData(datasoure, numColumns)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            numColumns={numColumns}
          />
        )}
      </View>
    );
  }
}

export default sang;

const style = StyleSheet.create({
  contrainer: {
    flex: 1,
    marginTop: 10,
  },
  itemStyle: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 2,
    height: WIDTH / numColumns,
    // height: 150,
    flexDirection: 'column'
  },
  itemText: {
    // paddingTop: 10,
    color: 'black',
    fontSize: 20,
    backgroundColor: 'gray',
    position: "absolute",
    opacity: 0.8,
  },
  imgbackground: {
    width: '100%',
    height: '100%',
  },
});
