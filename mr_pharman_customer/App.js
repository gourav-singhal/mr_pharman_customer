import React, { useEffect, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from './src/components/Icons';
import * as colors from './src/assets/css/Colors';
import * as Animatable from 'react-native-animatable';

/* Screens */
import AddAddress from './src/views/AddAddress';
import AddressList from './src/views/AddressList';
import CheckPhone  from './src/views/CheckPhone';
import CreatePassword  from './src/views/CreatePassword';
import CurrentLocation from './src/views/CurrentLocation';
import Faq from './src/views/Faq';
import FaqCategories from './src/views/FaqCategories';
import FaqDetails from './src/views/FaqDetails';
import LocationEnable from './src/views/LocationEnable';
import LoginHome from './src/views/LoginHome';
import More from './src/views/More';
import MyOrderHistories from './src/views/MyOrderHistories';
import Notifications from './src/views/Notifications';
import NotificationDetails from './src/views/NotificationDetails';
import OrderRating from './src/views/OrderRating';
import Otp from './src/views/Otp';
import Password  from './src/views/Password';
import PaymentMethods from './src/views/PaymentMethods';
import Pharmacies from './src/views/Pharmacies';
import PharmacySearch from './src/views/PharmacySearch';
import PharmCart from './src/views/PharmCart';
import PharmCategories from './src/views/PharmCategories';
import PharmProductDetails from './src/views/PharmProductDetails';
import PharmProducts from './src/views/PharmProducts';
import PrivacyPolicies from './src/views/PrivacyPolicies';
import Profile from './src/views/Profile';
import PromoCode from './src/views/PromoCode';
import Register from './src/views/Register';
import SelectCurrentLocation from './src/views/SelectCurrentLocation';
import Splash from './src/views/Splash';
import UploadPrescription from './src/views/UploadPrescription';
import Chat from './src/views/Chat'; 
import MyOrderDetails from './src/views/MyOrderDetails';
import AppUpdate from './src/views/AppUpdate';

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
const TabArr = [
  { route: 'Pharmacies', label: 'Home', type: Icons.Feather, icon: 'home', component: Pharmacies, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  { route: 'MyOrderHistories', label: 'MyOrders', type: Icons.Feather, icon: 'file-text', component: MyOrderHistories, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
  { route: 'More', label: 'More', type: Icons.FontAwesome, icon: 'user-circle-o', component: More, color: colors.theme_fg, alphaClr: colors.theme_bg_three },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? colors.theme_fg_three : colors.grey} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: colors.theme_fg_three, paddingHorizontal: 8
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" options={{headerShown: false}} >
      <Stack.Screen name="AddAddress" component={AddAddress} options={{ title: 'Add Address' }} />
      <Stack.Screen name="AddressList" component={AddressList} options={{ title: 'Address List' }} />
      <Stack.Screen name="CheckPhone" component={CheckPhone} options={{ title: 'Enter your phone number' }} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} options={{headerShown: false}} />
      <Stack.Screen name="CurrentLocation" component={CurrentLocation} options={{ title: 'Current Location' }} />
      <Stack.Screen name="Faq" component={Faq} options={{ title: 'Faq' }}  />
      <Stack.Screen name="FaqCategories" component={FaqCategories} options={{ title: 'Faq Categories' }} />
      <Stack.Screen name="FaqDetails" component={FaqDetails} options={{ title: 'Faq Details' }} />
      <Stack.Screen name="LocationEnable" component={LocationEnable} options={{ title: 'Location Enable' }} />
      <Stack.Screen name="LoginHome" component={LoginHome} options={{headerShown: false}} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notifications' }} />
      <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ title: '' }} />
      <Stack.Screen name="OrderRating" component={OrderRating} options={{headerShown: false}} />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen name="Password" component={Password} options={{headerShown: false}} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ title: 'Select Payment Mode' }} />
      <Stack.Screen name="PharmacySearch" component={PharmacySearch} options={{headerShown: false}} />
      <Stack.Screen name="PharmCart" component={PharmCart} options={{ title: 'Cart' }} />
      <Stack.Screen name="PharmCategories" component={PharmCategories} options={({ route }) => ({ title: route.params.vendor_name })} />
      <Stack.Screen name="PharmProductDetails" component={PharmProductDetails} options={{headerShown: false}} />
      <Stack.Screen name="PharmProducts" component={PharmProducts} options={({ route }) => ({ title: route.params.sub_category_name })} />
      <Stack.Screen name="PrivacyPolicies" component={PrivacyPolicies} options={{ title: 'Privacy Policies' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="PromoCode" component={PromoCode} options={{ title: 'Apply Promo Code' }} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="SelectCurrentLocation" component={SelectCurrentLocation} options={{ title: 'Select Current Location' }} />
      <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={TabNavigator}  options={{headerShown: false}} />
      <Stack.Screen name="UploadPrescription" component={UploadPrescription} options={{ title: 'Upload Prescription' }} />
      <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
      <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} options={{headerShown: false}} /> 
      <Stack.Screen name="AppUpdate" options={{ headerShown:false}} component={AppUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})

export default App;