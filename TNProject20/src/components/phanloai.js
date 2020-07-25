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
  Image,
} from 'react-native';
import {apiGetLoai} from '../Api'

const numColumns = 1;
const WIDTH = Dimensions.get('window').width;

export default class monantheoloai extends Component {

  // formatData = (datasoure, numColumns) => {
  //   const totalRows = Math.floor(datasoure.length / numColumns);
  //   let totalLastRow = datasoure.length - totalRows * numColumns;

  //   while (totalLastRow !== 0 && totalLastRow !== numColumns) {
  //     datasoure.push({key: 'blank', empty: true});
  //     totalLastRow++;
  //   }
  //   return datasoure;
  // };

  
  constructor(props) {
    super(props);
    this.state = {
      datasoure: [],
      isLoading: true,
    };
  };

  async componentDidMount(){
    console.log("check this.props danh muc:",this.props)
    const { route } = this.props
    console.log("check route:",route)
    const {params={}} = route
    console.log("check param:",params)
    if(!!params)
    {
      const loaimon = await apiGetLoai(params.maDM);
      this.setState({
        datasoure: loaimon
      })
    }
  }

  _renderItem = ({item}) => {
    let {itemStyle, imgbackground, itemText} = style;
    return (
      <View style={itemStyle}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Món ăn theo loai',item)}>
          <ImageBackground
            source={{uri: item.hinhMinhHoa}}
            style={imgbackground}>
            <Text style={itemText}>{item.tenLoai}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let {contrainer} = style;
    const {datasoure = [], isLoading} = this.state;
    console.log("check data:",datasoure)
    return (
      <View style={contrainer}>
          <FlatList
            data={datasoure}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            numColumns={numColumns}
          />
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
    alignContent: 'center',
    justifyContent: 'center',
    margin: 2,
    // height: WIDTH / numColumns,
    height: 150,
  },
  itemText: {
    color: '#fff',
    fontSize: 20,
    backgroundColor: 'gray',
    position: 'absolute',
    opacity: 0.8,
  },
  imgbackground: {
    width: '100%',
    height: '100%',
  },
});
