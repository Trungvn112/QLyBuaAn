import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

export default class antrua extends Component {
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
    fetch('http://192.168.1.9/Server/GetSUMKalo.php')
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
    if(item.Kalo > 200){
      Alert.alert('vượt quá mức Kalo')
      console.log("sai",item.Kalo)
    }
    let {itemStyle, img, centerContainer, itemtxt} = style;
    return (
      <View>
        <TouchableOpacity
          style={itemStyle}
          onPress={() =>
            this.props.navigation.navigate('Chi tiết món ăn', item)
          }>
          <Image source={{uri: item.hinhMinhHoa}} style={img} />
          <View style={centerContainer}>
            <Text style={itemtxt}>{item.tenMonAn}</Text>
            <Text style={itemtxt}>KALO: {item.Kalo}</Text>
            <Text ellipsizeMode="tail" numberOfLines={2}>GHI CHÚ:  
              {item.GhiChu}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderitemsepar = () => {
    return <View style={style.itemSepar} />;
  };

  render() {
    let {contrainer} = style;
    const {datasoure, isLoading} = this.state;
    console.log('object', datasoure);
    return (
      <View style={style.container}>
        <FlatList
          data={datasoure}
          renderItem={this._renderItem}
          keyExtractor={({maMon}, index) => maMon}
          ItemSeparatorComponent={this.renderitemsepar}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1,
    marginBottom: 3,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    margin: 5,
  },
  centerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  itemtxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  itemSepar: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
});
