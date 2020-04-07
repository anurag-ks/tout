import React from 'react';
import * as firebase from 'firebase';
import { FlatList, StyleSheet, ScrollView, View, TouchableOpacity, Modal, TouchableHighlight, Alert, ImageBackground} from 'react-native';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, ActionSheet, Text} from 'native-base';
import GeoFencing from 'react-native-geo-fencing';
import Geocoder from 'react-native-geocoding';
import { Input} from 'galio-framework';
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-swiper'
import CompleteFlatList from 'react-native-complete-flatlist';
import ActionButton from 'react-native-action-button';


var geodist = require('geodist');

export default class RestaurantsScreen extends React.Component{

    _isMounted = false;

    state :{
      data: [];
      active: false;
      showLocationModal: false;
      currentPosition:null;
      spinner: false;
      currentAddress:'';
    }

    constructor(props){
      super(props)

      this.state = {
        data:[],
        active: false,
        showLocationModal: false,
        currentPosition:null,
        currentAddress:'',
      }
    }

    componentDidMount(){
      this._isMounted = true
      this.setState({currentPosition: this.props.navigation.getParam('currentPosition')})
      if(!(this.state.currentPosition)){
        this.getData()
      }
      else{
        console.log(this.state.currentPosition);
      }

      Geocoder.init("AIzaSyBN1yLbw2SDfCYh4HfQVdt9yl9qRezm5Pw");
    }

    setCurrentPosition = pos => {
      this.setState({currentPosition:pos}, ()=>{
        console.log(this.state.currentPosition);
        let point = {
          lat: this.state.currentPosition.currentPosition.lat,
          lng: this.state.currentPosition.currentPosition.lng
        }
        Geocoder.from(point.lat, point.lng)
                .then(json => {
                    this.setState({currentAddress:json.results[0].formatted_address})
                })
                .catch(error => console.warn(error));

        let restaurantList = [];
        firebase.database().ref('Restaurants/').on("value", snapshot =>{
          restaurantList = [];
          snapshot.forEach((childSub) => {
            let currentObj = childSub.val();
            if(geodist(point, currentObj.location.point, {unit:'km'}) <= 10){
              childSub.val()["dist"] = geodist(point, currentObj.location.point, {unit:'km'});
              restaurantList.push(childSub.val());
            }
           });
           console.log(restaurantList);
           this.setState({data:restaurantList})
        })

      });
    }

    compareRatings( a, b ) {
      if ( a.rating < b.rating ){
        return 1;
      }
      if ( a.rating > b.rating ){
        return -1;
      }
      return 0;
    }

    sortByRating(){
      let tmp = this.state.data.sort(this.compareRatings);
      this.setState({data:tmp})
    }

    compareBudgets(a,b){
      if(a.cost_for_two < b.cost_for_two){
        return -1;
      }
      if(a.cost_for_two > b.cost_for_two){
        return 1;
      }
      return 0;
    }

    sortByBudget(){
      let tmp = this.state.data.sort(this.compareBudgets);
      this.setState({data:tmp})
    }

    componentWillUnmount(){
      this._isMounted = false
    }

    getData(){
      navigator.geolocation.getCurrentPosition((position) =>{
        let point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        Geocoder.from(point.lat, point.lng)
                .then(json => {
                    this.setState({currentAddress:json.results[0].formatted_address})
                })
                .catch(error => console.warn(error));
        let restaurantList = [];
        this.setState({spinner:true});
        firebase.database().ref('Restaurants/').on("value", snapshot =>{
        restaurantList = [];
        snapshot.forEach((childSub) => {
          let currentObj = childSub.val();
          if(geodist(point, currentObj.location.point, {unit:'km'}) <= 10){
            currentObj.dist = geodist(point, currentObj.location.point, {unit:'km'});

            restaurantList.push(currentObj);
            this.setState({data:restaurantList});
          }
         });
         this.setState({spinner:false})
        });
      }, (error)=>{alert(error.message)})
    }

    onItemPress(){
      alert("You Pressed");
    }

    render(){
      const {navigate} = this.props.navigation;
      let content;
      if(this.state.data.length==0){
        content = <Text style={{fontFamily:'raleway-extra-bold', fontWeight:'300', alignSelf:'center', marginTop:20}}>No restaurants found near you</Text>
      }
      else{
        content = <CompleteFlatList
        searchKey={['name']}
        searchBarBackgroundStyles={{backgroundColor:'#fafafa'}}
        extraData={this.state}
        pagingEnabled={true}
        data={this.state.data}
        renderItem={({item}) =>
          <TouchableOpacity onPress={() => navigate('RestaurantsDetails', {restaurantObj: item})}>
            <Card style={styles.item}>
              <CardItem bordered onPress={() => navigate('RestaurantsDetails', {restaurantObj: item})}>
                <Left onPress={() => navigate('RestaurantsDetails', {restaurantObj: item})}>
                  <Thumbnail square large source={require('../assets/images/01.jpg')}/>
                  <Body onPress={() => navigate('RestaurantsDetails', {restaurantObj: item})}>
                    <Text style={{ fontFamily:'questrial-regular', fontWeight:'300'}} onPress={() => navigate('RestaurantsDetails', {restaurantObj: item})}>{item.name}</Text>
                    <Text style={{ fontFamily:'questrial-regular', fontWeight:'300'}} note>{item.tags}</Text>
                    <Text style={{ fontFamily:'questrial-regular', fontWeight:'300'}} note>{item.dist} km</Text>
                  </Body>
                </Left>
                <Right>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontFamily:'questrial-regular', fontWeight:'300', color:'#3d8eda', fontSize:24}}>{item.rating}</Text>
                    <Icon name="star" style={{ color:'#3d8eda'}} ></Icon>
                  </View>
                </Right>
              </CardItem>
            </Card>
          </TouchableOpacity>
        }
        />
      }
      return (
          <ScrollView style={{backgroundColor:'#FAFAFA', paddingTop:30, height:'100%', marginBottom:10}}>
            <View style={styles.container}>
            <Spinner
              visible={this.state.spinner}
              textContent={'Loading...'}
              textStyle={{color:'#FFF'}}
              />

              <TouchableOpacity onPress={() => navigate('RestaurantLocationScreen', {setCurrentPosition: this.setCurrentPosition})}>
                <View style={{ flexDirection:'row', flexShrink:1, flexWrap:'wrap', padding:10, elevation:2, shadowRadius:2, backgroundColor:'#fafafa', marginBottom:10, marginLeft:10, marginRight:10, borderRadius:5}}>
                  <Text ellipsizeMode='tail' numberOfLines={2} style={{color:'#3d8eda', fontWeight:'300', fontFamily:'raleway-extra-bold', padding:5}}>{this.state.currentAddress}</Text>
                </View>
              </TouchableOpacity>
            {content}

            </View>

            <ActionButton
              buttonColor="#3d8eda"
              offsetY={-120}
              renderIcon={active => (
                <Icon style={{color:"#fafafa"}}name="funnel"></Icon>
              )} >

              <ActionButton.Item buttonColor='#9b59b6' title="By Location" onPress={() => {navigate('RestaurantLocationScreen', {setCurrentPosition: this.setCurrentPosition})}}>
                <Icon name="map" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="By Budget" onPress={() => { this.sortByBudget() }}>
                <Icon name="ios-cash" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="By Ratings" onPress={() => { this.sortByRating() }}>
                <Icon name="star" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </ScrollView>
        );
    }
}

RestaurantsScreen.navigationOptions = {
  headerTransparent: true,
};

const styles = StyleSheet.create({
  backgroundImage: {
  flex: 1,
  resizeMode: 'cover', // or 'stretch'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  header:{
    height:300,
    fontWeight:'300',
    fontFamily:'questrial-regular',
  },
  container: {
    backgroundColor: 'transparent',
    padding:10,
    marginBottom:10,
  },
  item: {
    fontWeight:'300',
    fontFamily:'questrial-regular',
    backgroundColor: '#FAFAFA',
    marginTop: 0,
    marginBottom:0,
    marginLeft: 0,
    marginRight: 0,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  submit_button:{
    width: 50,
    paddingBottom: 10,
  },
  filter_button:{
    marginTop:10,
    marginBottom: 10,
    padding:10,
    backgroundColor:'#3d8eda',
    borderRadius: 15,
    width:'35%',
    alignSelf:'flex-end',
  }
});
