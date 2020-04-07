import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Input, Block, Button, Text} from 'galio-framework'


export default class RestaurantBookingScreen extends React.Component{

    state :{
      date: '',
      isDateTimePickerVisible: false;
      data: [];
      menu: [];
      name: '';
      person_qty: 0;
      items: [];
    }

    _isMounted = false;

    constructor(props){
      super(props)

      this.state = {
        date: '',
        isDateTimePickerVisible: false,
        data:[],
        menu: [],
        name: '',
        person_qty: 0,
        items: [],
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.writeData = this.writeData.bind(this)
      this.props.navigation.navigate = this.props.navigation.navigate.bind(this);
    }

    showDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
      this.setState({date: date.toString()});
      this.hideDateTimePicker();
    };

    componentDidMount(){
      this._isMounted = true
      let restaurantObj = this.props.navigation.getParam('restaurant');
      let selectedVegStarters = this.props.navigation.getParam('selectedVegStarters');
      let selectedNonVegStarters = this.props.navigation.getParam('selectedNonVegStarters');
      let selectedVegMainCourse = this.props.navigation.getParam('selectedVegMainCourse');
      let selectedNonVegMainCourse = this.props.navigation.getParam('selectedNonVegMainCourse');

      this.setState({data:restaurantObj,
        menu:restaurantObj.menu,
        selectedVegStarters: selectedVegStarters,
        selectedNonVegStarters: selectedNonVegStarters,
        selectedVegMainCourse: selectedVegMainCourse,
        selectedNonVegMainCourse: selectedNonVegMainCourse,
      });
    }

    showProps(obj, objName) {
      var result = ``;
      for (var i in obj) {
        // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
        if (obj.hasOwnProperty(i)) {
          result += `${objName}.${i} = ${obj[i]}\n`;
        }
      }
      console.log(result);
    }

    compoentWillUnmount(){
      this._isMounted = false
    }

    onSubmit(){
      if(this.state.name== ''){
        alert('Enter the full name');
        return
      }
      if(!(this.state.date)){
        alert('Select the date and time');
        return
      }
      items = [this.state.selectedVegStarters, this.state.selectedNonVegStarters, this.state.selectedVegMainCourse, this.state.selectedNonVegMainCourse]
      this.writeData(this.state.name, this.state.person_qty, this.state.data.name, items, this.state.date, this.uuidv4());
    }

    uuidv4() {
      return 'xxxxxxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    writeData(name, person_qty, restaurant_name, items, date, booking_id){
      let currentUser = firebase.auth().currentUser.uid
      firebase.database().ref('Bookings/').push({
          name,
          person_qty,
          restaurant_name,
          items,
          date,
          currentUser,
          booking_id,
      }).then((data)=>{
          this.props.navigation.popToTop();
          alert("Booking Confirmed");
      }).catch((error)=>{
          alert(error.message);
      })
    }

    render(){
      return (
          <View style={styles.container}>
            <Text style={{paddingBottom:10, fontWeight:'bold', color:'#3d8eda'}} h1>Confirm Booking</Text>
            <Input placeholder="Full Name" onChangeText={(name) => this.setState({name})} />
            <Button onPress={this.showDateTimePicker} color="#3d8eda">Pick Date & Time</Button>
            <DateTimePicker
              mode="datetime"
              locale="en_IN"
              is24Hour={false}
              minimumDate={new Date()}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker} />
            <Text muted>{this.state.date.toString()}</Text>
            <Input type="numeric" placeholder="No. of Individuals" onChangeText={(person_qty) => this.setState({person_qty})} />
            <Button color="#3d8eda" style={styles.submit_button }onPress={this.onSubmit}>Confirm Booking</Button>
          </View>
    );
    }
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  submit_button:{
    marginTop: 20,
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
