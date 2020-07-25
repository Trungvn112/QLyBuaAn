import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;
export default class danhmuc extends Component {
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

  componentDidMount() {
    fetch('http://192.168.1.9/Server/GetDanhMuc.php')
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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Loại món ăn', item)}>
          <ImageBackground
            source={{uri: item.hinhMinhHoa}}
            style={imgbackground}>
            <Text style={itemText}>{item.tenDM}</Text>
          </ImageBackground>
        </TouchableOpacity>
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

const style = StyleSheet.create({
  contrainer: {
    flex: 1,
    paddingTop: 5,
  },
  itemStyle: {
    flex: 1,
    margin: 2,
    height: WIDTH / numColumns,
    height: 150,
  },
  itemText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    position: 'absolute',
    opacity: 0.8,
  },
  imgbackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
