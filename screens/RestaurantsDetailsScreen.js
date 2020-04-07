import React from 'react';
import * as firebase from 'firebase';
import { FlatList, StyleSheet, View, TouchableOpacity, Linking, ScrollView, Image} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Text, Card, Accordion, Block} from 'galio-framework';
import { Icon, Button} from 'native-base';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper'


export default class RestaurantsDetailsScreen extends React.Component{

    state : {
      data: [];
      selectedItems: [];
      restaurantItems: [];
      packages: [];
      selectedItem: '';
      isModalVisible: false;
      selectedPackageData: '';
    }
    _isMounted = false;

    constructor(props) {
      super(props)

      this.state = {
        data:[],
        selectedItems: [],
        selectedItem: '',
        restaurantItems: [],
        packages: [],
        isModalVisible: false,
        selectedPackageData: '',
      }

      this.onPressBooking = this.onPressBooking.bind(this);
      this.goToLocation = this.goToLocation.bind(this);
    }

    onSelectedItemsChange = (selectedItems) => {
      console.log(this.state.restaurantItems);

      this.setState({ selectedItems });
    };

    componentDidMount() {
      this._isMounted = true
      let restaurantObj = this.props.navigation.getParam('restaurantObj');
      this.setState({data:restaurantObj});
      let packages = [];
      for(var key in restaurantObj.packages){
        let children = [];
        packages.push(restaurantObj.packages[key])
      }
      this.setState({packages:packages});
    }

    compoentWillUnmount() {
      this._isMounted = false
    }

    onPressBooking() {
      if(this.state.selectedItems.length > 0){
        this.props.navigation.navigate('RestaurantBooking', {restaurantObj: this.state.data, selectedItems: this.state.selectedItems});
      }
      else{
        alert('Please select items from the menu.');
      }
    }

    goToLocation(){
      let restaurantObj = this.props.navigation.getParam('restaurantObj');
      let address = restaurantObj.name +"+"+restaurantObj.location.address;
      address = address.replace(/\s+/g, '+')
      Linking.openURL('https://www.google.com/maps/search/?api=1&query='+address);
    }

    render(){
      const {navigate} = this.props.navigation;
      return (
          <ScrollView style={styles.container}>

            <View style={styles.header}>
              <Swiper style={styles.wrapper} height={240}
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                paginationStyle={{
                  bottom: -23, left: null, right: 10
                }} loop>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../assets/images/01.jpg')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../assets/images/02.jpg')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../assets/images/01.jpg')} />
                </View>
                <View style={styles.slide}>
                  <Image resizeMode='stretch' style={styles.image} source={require('../assets/images/02.jpg')} />
                </View>
              </Swiper>
            </View>

            <View style={{padding:20}}>
              <Text style={{ fontFamily:'raleway-extra-bold', fontWeight:'300', color:'#3d8eda'}} h2>{this.state.data.name}</Text>
              <Separator />

              <View style={{flexDirection:'row'}}>
                <Button
                  iconLeft
                  style={{ fontFamily:'raleway-extra-bold', fontWeight:'300', padding:15, backgroundColor:'#3d8eda', borderRadius:10}}
                  onPress={this.goToLocation}
                  >
                  <Icon name='compass'></Icon>
                  <Text style={{ fontFamily:'raleway-extra-bold', fontWeight:'300', padding:10, color:'#fafafa'}}>Get Directions</Text>
                  </Button>
              </View>

              <Text h5 style={{alignSelf:'center', marginTop:20, paddingBottom:20, fontFamily:'questrial-regular', fontWeight:'300'}}>Packages</Text>

              <FlatList
                extraData={this.state}
                paddingEnabled={true}
                data={this.state.packages}
                renderItem={({item}) =>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("RestaurantMenuScreen", {packageObj:item, restaurantObj: this.state.data})}>
                    <View style={{padding:10, elevation:2, shadowRadius:2, backgroundColor:'#fafafa', marginBottom:10, marginLeft:10, marginRight:10, borderRadius:5}}>
                      <Text style={{fontFamily:'raleway-extra-bold', fontWeight:'300'}}>{item.name}</Text>
                      <Text style={{fontFamily:'raleway-medium', fontWeight:'300'}}>{item.details +"\n" +"INR "+ item.price}</Text>
                    </View>
                  </TouchableOpacity>

                } />
              </View>
          </ScrollView>
    );
    }
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#f5824a',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation:5,
  },
  header:{
    backgroundColor: '#3d8eda',
    height:250,
  },
  card:{
    fontFamily:'questrial-regular',
    fontWeight:'300',
    marginTop: 0,
    marginBottom:0,
    marginLeft: 5,
    marginRight: 5,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#3d8eda',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  location_button:{
    borderRadius: 10,
    width:'50%',
    alignSelf:'center',
    padding:10,
  },
  booking_button:{
    marginTop:10,
    backgroundColor:'#3d8eda',
    borderRadius: 10,
    width:'50%',
    alignSelf:'center',
    padding:10,
  }
});
