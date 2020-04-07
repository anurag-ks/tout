import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Icon, Body, H1, H2, H3 } from 'native-base';
import Modal from "react-native-modal";
import * as firebase from 'firebase'

export default class ProfileScreen extends React.Component{

  _isMounted = false;

  state :{
    data: [];
    isModalVisible: false;
    selectedItem: [];
    user_gender: '';
  }

  constructor(props){
    super(props)

    this.state = {
      data:[],
      isModalVisible: false,
      selectedItem: [],
      user_gender:'',
    }

    this.signOut = this.signOut.bind(this);
    this.user = firebase.auth().currentUser;
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(bookingObj) {
    console.log(bookingObj);
    this.setState({selectedItem:bookingObj}, () =>{
      console.log(bookingObj);
      this.setState({ isModalVisible: !this.state.isModalVisible });
    })
  }

  componentDidMount(){
    this._isMounted = true
    this.getBookings()
    let gender;
    firebase.database().ref("users/").on("value", snapshot => {
      snapshot.forEach((childSub) => {
        if(firebase.auth().currentUser.uid == childSub.val().user_uid){
          gender = childSub.val().gender;
        }
      });
    })
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  getBookings(){
    firebase.database().ref("Bookings/").on("value", snapshot => {
      let items = [];
      snapshot.forEach((childSub) => {
        if(firebase.auth().currentUser.uid == childSub.val().currentUser){
          items.push(childSub.val());
        }
      });
      this.setState({data:items});
    })
  }

  signOut(){
    firebase.auth().signOut();
    alert("You have been logged out.")
  }

  render(){
    let content;
    if(this.state.data.length == 0){
      content = <Text style={{alignSelf:'center', fontFamily:'raleway-medium', fontWeight:'300'}}>No bookings done.</Text>;
    }
    else{
      content = <FlatList
                  data={this.state.data}
                  renderItem={({item}) =>

                  <Card style={styles.item} onPress={() => this.toggleModal(item)}>
                    <CardItem header onPress={() => this.toggleModal(item)}>
                      <Text onPress={() => this.toggleModal(item)}>{item.restaurant_name}</Text>
                    </CardItem>
                    <CardItem>
                      <Body onPress={() => this.toggleModal(item)}>
                        <Text onPress={() => this.toggleModal(item)}>
                          {item.date}
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer button onPress={() => this.toggleModal(item)}>
                      <Text>View</Text>
                    </CardItem>
                  </Card>
                } />
    }

    let avatar;
    if(this.state.user_gender=='female'){
      avatar = <Image style={styles.avatar} source={require('../assets/images/female_avatar.png')}/>
    }
    else{
      avatar = <Image style={styles.avatar} source={require('../assets/images/male_avatar.png')}/>
    }
    return (
      <Content>
          <View style={styles.header}>
            <Image source={require('../assets/images/profile_screen_background.jpg')} style={{height:200}}></Image>
          </View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1, backgroundColor:'#fafafa', borderRadius:15, padding: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 400, height: 300, alignItems:'center', padding:10}}>
                <H1  style={{ fontFamily:'raleway-extra-bold', fontWeight:'300'}}>Booking Details</H1>
                <Separator/>
                <View style={{padding:20, borderRadius: 5,
                    shadowOffset: {
                      width: 0,
                      height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.5,
                    elevation:2}}>
                  <H2>{this.state.selectedItem.restaurant_name}</H2>
                  <Separator/>
                  <H3  style={{ fontFamily:'raleway-medium', fontWeight:'300'}}><Text style={{fontWeight:'bold'}}>Booking Name</Text>: {this.state.selectedItem.name}</H3>
                  <H3  style={{ fontFamily:'raleway-medium', fontWeight:'300'}}><Text style={{fontWeight:'bold'}}>Date & Time</Text>: {this.state.selectedItem.date}</H3>
                  <H3  style={{ fontFamily:'raleway-medium', fontWeight:'300'}}><Text style={{fontWeight:'bold'}}>Booking ID</Text>: {this.state.selectedItem.booking_id}</H3>
                  <H3  style={{ fontFamily:'raleway-medium', fontWeight:'300'}}><Text style={{fontWeight:'bold'}}>Guest Count</Text>: {this.state.selectedItem.person_qty}</H3>
                </View>
                <Button onPress={this.toggleModal} style={{backgroundColor:'#3d8eda', borderRadius:15, padding:15, alignSelf:'center', marginTop:15}}>
                  <Text  style={{ fontFamily:'questrial-regular', fontWeight:'300'}}>Close</Text>
                </Button>
              </View>
            </View>
          </Modal>
          {avatar}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.user.displayName}</Text>
            </View>
          </View>
          <View style={styles.bookings}>
            <Text style={styles.description}>My Bookings</Text>
            {content}
            <Button onPress={this.signOut} style={{marginTop:15, backgroundColor:'#3d8eda', borderRadius:15, padding:15, alignSelf:'center'}}><Text style={{ fontFamily:'raleway-medium', fontWeight:'300'}}>Logout</Text></Button>
          </View>
      </Content>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerTransparent:true,
  headerTitleStyle: {fontFamily: 'rajdhani_semibold', fontWeight: "200", color:'#fafafa', fontSize: 25,},
  headerStyle:{ fontFamily:'space-mono', opacity:0, backgroundColor: 'transparent', zIndex: 100}
};

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "transparent",
    height:200,
  },
  bookings:{
    padding: 10
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    fontFamily: 'rajdhani_semibold',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center',
    fontFamily:'raleway-extra-bold',
    fontWeight:'300',
  },
  item:{
    borderRadius: 15,
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation:5,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#3d8eda',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
