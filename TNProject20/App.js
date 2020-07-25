import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {Share, Linking, View} from 'react-native';
import {Header, Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from './src/screens/trangchu';
import Detail from './src/screens/chonmon';
import Chitietmonan from './src/screens/chitietmonan';
import Search from './src/screens/timkiem';
import Yeuthich from './src/screens/yeuthich';
import Monmoi from './src/screens/monmoi';
import Thembai from './src/screens/thembaiviet';
import Login from './src/screens/Login';

import Danhmuc from './src/components/danhmuc';
import Phanloai from './src/components/phanloai';
import Loaimonan from './src/components/monantheoloai';

import Trua from './src/screens/tab/trua';
import Sang from './src/screens/tab/sang';
import Toi from './src/screens/tab/toi';

import Like from './src/screens/tab/video';

import HeaderLeft from './src/shared/headerLeft';
import HeaderRight from './src/shared/headerRight';
import Upload from './src/shared/upload';

import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { ActivityIndicator } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialTop = createMaterialTopTabNavigator();
const MaterialBot = createMaterialBottomTabNavigator();

export default class App extends Component {
  
  render() {
    console.disableYellowBox = true
    createHomeStack = () => (
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          header: () => {
            return (
              <Header
                leftComponent={
                  <FontAwesome5
                    name="arrow-left"
                    solid
                    size={30}
                    style={{paddingBottom: 20}}
                    onPress={() => navigation.goBack()}
                  />
                }
                rightComponent={
                  <Upload navigation={navigation} />
                }
              />
            );
          },
        })}>
        <Stack.Screen name="Login" component={Login} initialRouteName='Login' options={{headerShown:false}} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            header: () => {
              return (
                <Header
                  rightComponent={<HeaderRight navigation={navigation} />}
                  centerComponent={{
                  }}>
                  {<HeaderLeft navigation={navigation} />}
                </Header>
              );
            },
          })}
        />
        <Stack.Screen name="Chọn món" component={Detail} />
        <Stack.Screen name="Chi tiết món ăn" component={Chitietmonan} />
        <Stack.Screen name="Danhmuc" component={Danhmuc} />
        <Stack.Screen name="Loại món ăn" component={Phanloai} />
        <Stack.Screen name="Món ăn gọi ý" children={createTopTab} />
        <Stack.Screen name="Món ăn theo loai" component={Loaimonan} />
        <Stack.Screen name="Tìm kiếm" component={Search} />
        <Stack.Screen name="Yêu thích" component={Yeuthich} />
        <Stack.Screen name="Món mới" component={Monmoi} />
        <Stack.Screen
          name="Thêm bài viết"
          component={Thembai}
        />
      </Stack.Navigator>
    );

    createTopTab = () => {
      return (
        <MaterialTop.Navigator>
          <MaterialTop.Screen name="Sáng" component={Sang} />
          <MaterialTop.Screen name="Trưa" component={Trua} />
          <MaterialTop.Screen name="Tối" component={Toi} />
        </MaterialTop.Navigator>
      );
    };

    createBotTab = () => {
      return (
        <MaterialBot.Navigator>
          <MaterialBot.Screen name="Like" component={Like} />
          <MaterialBot.Screen name="Cá nhân" component={Profile} />
        </MaterialBot.Navigator>
      );
    };

    onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const Start = () => {
      const [isLoading, setIdLoading] = React.useState(true);
      const [userToken, setUserToken] = React.useState(null);
    
      useEffect(() => {
         
      }, []);
      if(isLoading) {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{headerStyle: {backgroundColor: 'red'}}}
          initialRouteName="Home"
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                  label="Yêu thích"
                  onPress={() => props.navigation.navigate('Yêu thích')}
                />
                <DrawerItem label="Chia sẽ App" onPress={() => onShare()} />
                <DrawerItem
                  label="Thư góp ý"
                  onPress={() => Linking.openURL('mailto:support@example.com')}
                />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen name="Trang chủ" children={createHomeStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
