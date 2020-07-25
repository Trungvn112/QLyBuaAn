import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
class yeuthich extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }

  componentDidMount = async () => {
    try {
      AsyncStorage.getItem('arr').then(arr => {
        if (arr !== null) {
          const cartfood = JSON.parse(arr);
          this.setState({arr: cartfood});
          // We have data!!
          console.log('arr', cartfood);
          alert(cartfood);
        }
      });
    } catch (error) {
      // Error retrieving data
      console.log('not');
    }
  };

  renderItem = ({item}) => {
    let {itemStyle, img, centerContainer, itemtxt} = style;
    return (
      <View style={style.renderFlast}>
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
        <FontAwesome5
          name="delete"
          size={50}
          onPress={() => this.deleteItemById(item.tenMonAn)}
        />
      </View>
    );
  };

  deleteItemById = async tenMonAn => {
    const list = this.state.arr.filter(item => item.tenMonAn !== tenMonAn);
    this.setState({arr: list});
  };

  renderitemsepar = () => {
    return <View style={style.itemSepar} />;
  };

  render() {
    const {arr} = this.state;
    console.log('arr in reandewr:', arr);
    return (
      <View>
        <ScrollView>
          <View style={style.container}>
            <FlatList
              data={arr}
              renderItem={this.renderItem}
              keyExtractor={({tenMonAn}, index) => tenMonAn}
              ItemSeparatorComponent={this.renderitemsepar}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default yeuthich;
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
  renderFlast: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
