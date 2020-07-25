import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {apiGetMonAnTheoLoai} from '../Api';
export default class monantheoloai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasoure: [],
    };
  }

  async componentDidMount() {
    // console.log('check this.props danh muc:', this.props);
    const {route} = this.props;
    // console.log('check route:', route);
    const {params = {}} = route;
    // console.log('check param:', params);
    if (!!params) {
      const monantheoloai = await apiGetMonAnTheoLoai(params.maLoai);
      // console.log('check dishflowCate:', monantheoloai);
      this.setState({
        datasoure: monantheoloai,
      });
    }
  }

  /**this item view */
  renderItem = ({item}) => {
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
            <Text ellipsizeMode="tail" numberOfLines={2}>
              {item.cachNau}
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
    const {datasoure = [], isLoading} = this.state;
    console.log('check dátoure', datasoure);
    return (
      <View style={style.container}>
        <FlatList
          data={datasoure}
          renderItem={this.renderItem}
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
