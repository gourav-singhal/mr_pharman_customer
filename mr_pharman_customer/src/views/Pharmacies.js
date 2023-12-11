import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Dimensions, SafeAreaView, Text, ScrollView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import * as colors from '../assets/css/Colors';
import Icon, { Icons } from '../components/Icons';
import { regular, bold, show_vendor_list, api_url, img_url, get_module_banners, location } from '../config/Constants';
import CardView from 'react-native-cardview';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from '../components/Loader'; 
import { updateCurrentAddress, updateCurrentLat, updateCurrentLng, currentTag, updateAddress  } from '../actions/CurrentAddressActions';

const Pharmacies = (props) => {

  const navigation = useNavigation();
  const [vendor_list, setVendorList] = useState([]); 
  const [recommended_list, setRecommendedList] = useState([]); 
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false); 

  const view_categories = (pharm_id, vendor_name) => {
    navigation.navigate("PharmCategories",{ pharm_id : pharm_id, vendor_name : vendor_name  });
  }
  useEffect( () => {
    get_pharmacies();
    module_banners();
  },[]);

  const set_address = () =>{
    navigation.navigate("SelectCurrentLocation")
  }

  const get_pharmacies = async (search) => {
    setLoading(true);
    await axios({
      method: "post",
      url: api_url + show_vendor_list,
      data:{ customer_id : global.id, search:'', lat:props.current_lat, lng:props.current_lng }
    })
    .then(async (response) => {
      setLoading(false);
      if(response.data.status == 1){
        setVendorList(response.data.result.vendor_list);
        setRecommendedList(response.data.result.recommended);
      }
    })
    .catch((error) => {
      setLoading(false);
      alert('Sorry something went wrong');
    });
  };

  const module_banners = async() =>{
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + get_module_banners,
      data:{ app_module : 1 }
    })
    .then(async response => {
      setLoading(false);
      if(response.data.status == 1){
        setBanners(response.data.result)
      }
    })
    .catch(error => {
      setLoading(false);
      console.log(error)
      alert('Sorry something went wrong');
    });
  } 

  const banners_list = () => { 
    return banners.map((data) => {
      return (
        <TouchableOpacity activeOpacity={1}>
          <ImageBackground  source={{ uri : img_url + data.url }} imageStyle={styles.home_style2} style={styles.home_style3} />
        </TouchableOpacity>
      )
    });
  }

  const navigate_pharm_cart =() =>{
    if(props.cart_count != undefined){
      navigation.navigate("PharmCart")
    }else{
      alert("Add your products in cart.")
    }
  }

  const renderItem = ({ item }) => (

    <View style={{ padding:10 }}>
      <TouchableOpacity activeOpacity={1} onPress={view_categories.bind(this,item.id,item.store_name)}>
        <CardView
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={10}>
          <View style={styles.box_container}>
            <Image
              style={{ width: '100%', height:180, borderTopLeftRadius:10, borderTopRightRadius:10 }}
              source={{
                  uri: img_url + item.store_image
              }}
            />
            <View style={{ flexDirection:'row', padding:20}}>
              <View style={{ width:'80%', alignItems:'flex-start', justifyContent:'center'}}>
                <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:16 }}>{item.store_name}</Text>
                <View style={{ margin:2 }} />
                <Text numberOfLines={2} ellipsizeMode='tail' style={{ color:colors.grey, fontFamily:regular, fontSize:12 }}>{item.address}</Text>
              </View>
              <View style={{ width:'20%', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <View style={{ width:50, backgroundColor:'green', padding:5, borderRadius:5, alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
                  {item.overall_ratings > 0 ? 
                    <View style={{ flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                      <Text style={{ fontSize:12, color:colors.theme_fg_three, fontFamily:bold}}>{item.overall_ratings} </Text>
                      <Icon style={{ color:colors.theme_fg_three, fontSize:10 }} type={Icons.Ionicons} name="star" />
                    </View>
                  :
                    <View>
                      <Text style={{ fontSize:12, color:colors.theme_fg_three, fontFamily:bold}}>New</Text>
                    </View>
                  }
                </View>
              </View>  
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    </View>
  );
  
  const search = () =>{ 
      navigation.navigate("PharmacySearch",{ lat:props.current_lat, lng:props.current_lng });
  }

  const show_recommended_vendors = () => { 
    return recommended_list.map((data) => {
      return (
        <CardView
          cardElevation={4}
          cardMaxElevation={4}
          style={{ width:200, margin:10 }}
          cornerRadius={10}>
          <TouchableOpacity activeOpacity={1} onPress={view_categories.bind(this,data.id,data.store_name)} style={{ alignItems: 'center', borderRadius:10, alignItems:'center', justifyContent:'center' }}>
            <View style={{ width:200, height:100 }}>
              <Image source={{ uri : img_url + data.store_image }} style={{ width:undefined, height:undefined, flex:1, borderTopLeftRadius:10, borderTopRightRadius:10 }} />
            </View>
            <View style={{ margin:5 }} />
            <Text style={{ fontSize:14, color:colors.theme_fg_two, fontFamily:bold }}>{data.store_name}</Text>
            <View style={{ margin:5 }} />
            <Text numberOfLines={2} ellipsizeMode='tail' style={{ color:colors.grey, fontFamily:regular, fontSize:12 }}>{data.address}</Text>
            <View style={{ margin:10 }} />
          </TouchableOpacity>
        </CardView>
      )
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView style={{ padding:10}} showsVerticalScrollIndicator={false}>
      <View style={{ margin:5}} /> 
      <View style={styles.header} >
        <TouchableOpacity onPress={set_address} style={{height: 30, width: 20}}>
          <Image style={{ height: undefined, width: undefined, flex: 1,}} source={location} />
        </TouchableOpacity>
        <View style={{ margin:5}} />
        <TouchableOpacity onPress={set_address} style={{ width:'80%'}}>
          <Text style={{ color:colors.theme_fg_two, fontFamily:bold }}>{props.current_tag}</Text>
          <Text numberOfLines={1} style={{ color:colors.theme_fg_two, fontSize:12, fontFamily:regular}}>{props.current_address}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigate_pharm_cart.bind(this)} style={{height: 30, width: 20, justifyContent:'center', alignItems:'center'}}>
          <Icon type={Icons.Ionicons} name="cart" style={{ fontSize:25, color:colors.theme_fg}} />
          {props.cart_count != undefined ?
            <Text style={{ color:colors.theme_fg_three, fontFamily:bold, fontSize:16, backgroundColor:'red', borderRadius:10, justifyContent:'center', textAlign:'center', position:'absolute', top:-10, left:16, width:20 }}>{props.cart_count}</Text>
            :
            <Text style={{ color:colors.theme_fg_three, fontFamily:bold, fontSize:16, backgroundColor:'red', borderRadius:10, justifyContent:'center', textAlign:'center', position:'absolute', top:-10, left:16, width:20 }}>+</Text>
          }
        </TouchableOpacity>
      </View>
      <View style={{ margin:10 }} />
      {vendor_list.length > 0 ?
        <View>
          <ScrollView style={{ padding:10}} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={search} activeOpacity={1} style={{height: 45, borderRadius:10, padding:10, borderColor:colors.grey, justifyContent:'center', backgroundColor:colors.light_blue, width:'100%'}}>
              <Text style={{ fontSize:14, color:colors.grey, fontFamily:regular}}>Search pharmacies...</Text>
          </TouchableOpacity>
          <View style={{ margin:10 }} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {banners_list()}
          </ScrollView>
          <View style={{ margin:10 }} />
          {recommended_list.length > 0 &&
            <View>
              <Text style={{ fontSize:18, color:colors.theme_fg_two, fontFamily:bold}}>Recommended For You</Text>
              <View style={styles.ban_style1}>
                <ScrollView horizontal={true} style={{ padding:10}} showsHorizontalScrollIndicator={false}>
                    {show_recommended_vendors()}
                </ScrollView>
              </View>
            </View>
          }
          <Text style={{ fontSize:18, color:colors.theme_fg_two, fontFamily:bold}}>Nearest Pharmacies</Text>
          <View style={{ margin:5 }} />
            <FlatList
              data={vendor_list}

              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <View style={{ margin:20 }} />
          </ScrollView>
          <View style={{ margin:20 }} />
        </View>
      :
        <View style={{ width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
           <Text style={{ fontFamily:bold, color:colors.theme_fg_two, fontSize:16}}>Sorry no data found</Text>
        </View>
      }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'row',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  searchBarContainer:{
    borderColor:colors.light_grey, 
    borderRadius:10,
    borderWidth:2, 
    height:45
  },
  textFieldcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 45,
  },
  textFieldIcon: {
    paddingLeft:10,
    paddingRight:5,
    fontSize:20, 
    color:colors.theme_fg
  },
  textField: {
    flex: 1,
    padding: 5,
    borderRadius: 10,
    height: 45,
    fontFamily:regular
  },
  box_container:{
    borderRadius:10,
  },
  home_style2:{
    borderRadius: 10
  },
  home_style3:{
    height:150, 
    width:280, 
    borderRadius:10, 
    marginRight:10,
  }
  
});

function mapStateToProps(state){
  return{
    current_lat : state.current_location.current_lat,
    current_lng : state.current_location.current_lng,
    current_address : state.current_location.current_address,
    current_tag : state.current_location.current_tag,
    address : state.current_location.address,
    cart_count : state.order.cart_count,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateAddress: (data) => dispatch(updateAddress(data)),
  updateCurrentAddress: (data) => dispatch(updateCurrentAddress(data)),
  updateCurrentLat: (data) => dispatch(updateCurrentLat(data)),
  updateCurrentLng: (data) => dispatch(updateCurrentLng(data)),
  currentTag: (data) => dispatch(currentTag(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Pharmacies);