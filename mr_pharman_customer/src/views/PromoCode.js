import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native';
import * as colors from '../assets/css/Colors';
import { regular, bold, promo_code, api_url, check_promo_code } from '../config/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Loader  from '../components/Loader';
import { updatePromo } from '../actions/PharmOrderActions';
import { connect } from 'react-redux';

const PromoCode = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [promo_value, setPromoValue] = useState([]);
  const [promo_code_value, setPromoCodeValue] = useState([]); 
  const [from, setFrom] = useState(route.params.from);
  useEffect(() => {
    get_promo();
    
  },[]);

  const get_promo = async () => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + promo_code,
      data:{ customer_id: global.id, vendor_id:props.pharm_id}
    })
    .then(async response => {
      setLoading(false);
      setPromoValue(response.data.result);
    })
    .catch(error => {
      setLoading(false);
      alert('Sorry something went wrong')
    });
  }

const check_promo = async () => {
  Keyboard.dismiss();
    await setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + check_promo_code,
      data:{ customer_id: global.id, vendor_id:props.pharm_id, promo_code:promo_code_value}
    })
    .then(async response => {
      await setLoading(false);
      if(response.data.status == 1){
        await apply_promo(response.data.result); 
      }else{
        await alert(response.data.message);
      }
    })
    .catch(async error => {
      await setLoading(false);
      await alert('Sorry something went wrong');
    });
}

const apply_promo = async(promo) =>{
    if(promo.min_purchase_price <= props.sub_total){
      await props.updatePromo(promo);
      await navigation.navigate("PharmCart");
    }else{
      alert('In order to using this promo code, your total value need to reach min '+promo.min_purchase_price);
    }
}

const renderItem = ({ item }) => (
  <View style={{ borderBottomWidth:10, borderColor:colors.light_grey}}>
    <View style={{ padding:10, paddingBottom:10}}>  
      <View style={{justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{ fontFamily:regular, fontSize:20, color:colors.theme_fg_two}}>{item.promo_name}</Text>
        <View style={{ margin:2 }} />
        <Text style={{ fontFamily:regular, fontSize:13, color:colors.regular}}>{item.description}</Text>  
        <View style={{ margin:2 }} />
        {/*<Text style={{ fontFamily:regular, fontSize:10, color:colors.grey,}}>Valid on orders with items worth {global.currency}{item.min_purchase_price} or more.View Details</Text>*/}
        <Text style={{ fontFamily:regular, fontSize:10, color:colors.grey,}}>{item.long_description}</Text>
      </View>
    </View>
    <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:colors.light_grey, padding:10, borderTopWidth:1, paddingTop:15, paddingBottom:15 }}>
      <View style={{ width:'60%', justifyContent:'center', alignItems:'flex-start'}}>
        <Text style={{borderWidth:0.5, padding:3,letterSpacing:1, fontFamily:regular, fontSize:14,borderStyle: 'dashed',backgroundColor:colors.light_grey,color:colors.theme_fg_two}}>{item.promo_code}</Text> 
      </View>
      <View style={{ width:'40%',justifyContent:'center', alignItems:'flex-end'}}>
        <TouchableOpacity onPress={apply_promo.bind(this,item)}>
          <Text style={{ fontFamily:regular, fontSize:12, color:colors.error}}>APPLY</Text>
        </TouchableOpacity>
      </View>  
    </View>
    <View style={{ margin:2 }} />
    <Text style={{ padding:10, fontFamily:regular, fontSize:10, color:colors.theme_fg_two}}>You will save {global.currency}{item.discount} with this code</Text>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />
        <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, padding:10,paddingBottom:10}}>
          <View style={{ width:'60%', justifyContent:'center', alignItems:'flex-start'}}>
            <TextInput
              placeholder="Enter coupon code"
              underlineColorAndroid="transparent"
              onChangeText={text => setPromoCodeValue(text)}
            />
          </View>
          <View style={{ width:'40%',justifyContent:'center', alignItems:'flex-end'}}>
            <TouchableOpacity onPress={check_promo}>
              <Text style={{ fontFamily:regular, fontSize:12, color:colors.error}}>APPLY</Text>
            </TouchableOpacity>
          </View>  
        </View>
        <View style={{ margin:10 }} />  
        <View style={{ width:'100%', flexDirection:'row',height:40, padding:10, backgroundColor:colors.light_grey, }}>
          <View style={{ justifyContent:'center', alignItems:'flex-start'}}>
            <Text style={{ fontFamily:regular, fontSize:16, color:colors.regular_grey}}>Available Coupons</Text>
          </View>
        </View>
        {promo_value.length > 0 ?
          <FlatList
            data={promo_value}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          :
          <View style={{ width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <Text style={{ fontFamily:bold, color:colors.theme_fg_two, fontSize:16}}>Sorry no data found</Text>
          </View>
        }
        <View style={{ margin:10 }} />
      </ScrollView>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
});

function mapStateToProps(state){
  return{
    sub_total : state.order.sub_total,
    pharm_id : state.order.pharm_id,
  };
}

const mapDispatchToProps = (dispatch) => ({
  updatePromo: (data) => dispatch(updatePromo(data)),
});

export default connect(mapStateToProps,mapDispatchToProps)(PromoCode);

