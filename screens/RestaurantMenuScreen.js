import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Text, Button } from 'galio-framework';
import { Icon } from 'native-base';


export default class RestaurantMenuScreen extends React.Component{

  state: {
    data: '';
    package:'';
    restaurant:'';
    non_veg_main_course: [];
    veg_main_course: [];
    starters: [];
    maxStarters: false;

    selectedVegStarters:[];
    selectedNonVegStarters:[];
    selectedVegMainCourse:[];
    selectedNonVegMainCourse:[];
  }

  maxStarters = 2

  constructor(props){
    super(props)

    this.maxVegStarters = 2
    this.maxNonVegStarters = 2
    this.maxVegMainCourse = 2
    this.maxNonVegStarters = 2

    this.state = {
      data:'',
      package:'',
      restaurant:'',

      non_veg_starters: [],
      veg_starters: [],
      non_veg_main_course: [],
      veg_main_course: [],

      maxNonVegStarters:false,
      mavVegStarters:false,
      maxVegMainCourse:false,
      maxNonVegMainCourse:false,

      selectedVegStarters:[],
      selectedNonVegStarters:[],
      selectedVegMainCourse:[],
      selectedNonVegMainCourse:[],
    }

    this.onPressBooking = this.onPressBooking.bind(this);
  }

  onSelectedNonVegStartersChange = (selectedNonVegStarters) => {
      if (selectedNonVegStarters.length >= this.maxStarters) {
        if (selectedNonVegStarters.length === this.maxStarters) {
          this.setState({ selectedNonVegStarters })
        }
        this.setState({
          maxNonVegStarters: true,
        })
        return
      }
      this.setState({
        maxNonVegStarters: false,
      })

      this.setState({ selectedNonVegStarters })
    }

  onSelectedVegStartersChange = (selectedVegStarters) => {
      if (selectedVegStarters.length >= this.maxStarters) {
        if (selectedVegStarters.length === this.maxStarters) {
          this.setState({ selectedVegStarters })
        }
        this.setState({
          maxVegStarters: true,
        })
        return
      }
      this.setState({
        maxVegStarters: false,
      })

      this.setState({ selectedVegStarters })
    }

  onSelectedNonVegMainCourseChange = (selectedNonVegMainCourse) => {
      if (selectedNonVegMainCourse.length >= this.maxStarters) {
        if (selectedNonVegMainCourse.length === this.maxStarters) {
          this.setState({ selectedNonVegMainCourse })
        }
        this.setState({
          maxNonVegMainCourse: true,
        })
        return
      }
      this.setState({
        maxNonVegMainCourse: false,
      })

      this.setState({ selectedNonVegMainCourse })
    }

  onSelectedVegMainCourseChange = (selectedVegMainCourse) => {
        if (selectedVegMainCourse.length >= this.maxStarters) {
          if (selectedVegMainCourse.length === this.maxStarters) {
            this.setState({ selectedVegMainCourse })
          }
          this.setState({
            maxVegMainCourse: true,
          })
          return
        }
        this.setState({
          maxVegMainCourse: false,
        })

        this.setState({ selectedVegMainCourse })
      }

  componentDidMount(){
    let restaurantObj = this.props.navigation.getParam('restaurantObj');
    let packageObj = this.props.navigation.getParam('packageObj');
    this.setState({restaurant:restaurantObj});
    this.setState({package:packageObj});
    let non_veg_starters = [
      {
        name: 'Non Veg',
        id: 9,
        children:[],
      }
    ];
    let veg_starters = [
      {
        name: 'Veg',
        id: 10,
        children:[],
      }
    ];
    let non_veg_main_course = [
      {
        name: 'Non Veg',
        id: 11,
        children:[],
      }
    ];
    let veg_main_course = [
      {
        name: 'Veg',
        id: 12,
        children:[],
      }
    ];
    this.setState({
      data:restaurantObj,
    })
    this.setState({starters: restaurantObj.menu.starters},
      ()=>{
        for(key in this.state.starters.veg){
          veg_starters[0].children.push({id:key, name:this.state.starters.veg[key]});
        }
        for(key in this.state.starters.non_veg){
          non_veg_starters[0].children.push({id:key, name:this.state.starters.non_veg[key]});
        }
        this.setState({non_veg_starters:non_veg_starters});
        this.setState({veg_starters:veg_starters});
      });
    this.setState({main_course: restaurantObj.menu.main_course},
      ()=>{
        for(key in this.state.main_course.veg){
          veg_main_course[0].children.push({id:key, name:this.state.main_course.veg[key]});
        }
        for(key in this.state.main_course.non_veg){
          non_veg_main_course[0].children.push({id:key, name:this.state.main_course.non_veg[key]});
        }
        this.setState({non_veg_main_course:non_veg_main_course});
        this.setState({veg_main_course:veg_main_course});
      }
    )
  }

  onPressBooking(){
    if(this.state.selectedVegStarters.length == 0){
      alert("Please select the veg starters");
      return
    }
    if(this.state.selectedNonVegStarters.length == 0){
      alert("Please select the non-veg starters");
      return
    }
    if(this.state.selectedVegMainCourse.length == 0){
      alert("Please select the veg main course items");
      return
    }
    if(this.state.selectedNonVegMainCourse.length == 0){
      alert("Please select the non-veg main course items");
      return
    }
    else{
      this.props.navigation.navigate('RestaurantBooking', {selectedVegStarters:this.state.selectedVegStarters,
                                                           selectedNonVegStarters:this.state.selectedNonVegStarters,
                                                           selectedVegMainCourse:this.state.selectedVegMainCourse,
                                                           selectedNonVegMainCourse:this.state.selectedNonVegMainCourse,
                                                           package:this.state.package,
                                                           restaurant:this.state.restaurant,
                                                           })
    }
  }

  render(){
    let headerComponent = <Text style={{padding:10, fontFamily:'raleway-extra-bold', fontWeight:'300', alignSelf:'center'}} p>Select items from the menu</Text>
    let unselectedItem = <Icon name="square-outline"></Icon>
    let selectedItem = <Icon name="checkbox"></Icon>

    return(
      <ScrollView style={{paddingTop:50, padding:10}}>
        <View style={styles.container}>
          <Text style={{padding:10, fontFamily:'raleway-medium', fontWeight:'300'}} p>{this.state.package.details}</Text>
          <Text style={{padding:10, fontFamily:'raleway-medium', fontWeight:'300'}} p>INR {this.state.package.price}</Text>

          <View style={{padding:10, elevation:2, shadowRadius:2, backgroundColor:'#fafafa', marginBottom:10, marginLeft:10, marginRight:10, borderRadius:5}}>
            <Text style={{fontFamily:'raleway-extra-bold', fontWeight:'300'}} h4>Starters:</Text>
            <View>
              <SectionedMultiSelect
                searchPlaceholderText="Search.."
                items={this.state.non_veg_starters}
                uniqueKey="id"
                subKey="children"
                selectText="Non Veg"
                readOnlyHeadings={true}
                showDropDowns={true}
                readOnlyHeadings={true}
                expandDropDowns={true}
                showCancelButton={true}
                showRemoveAll={true}
                itemFontFamily={{fontFamily:'raleway-extra-bold', fontWeight:'300'}}
                subItemFontFamily={{fontFamily:'raleway-medium', fontWeight:'300'}}
                onSelectedItemsChange={this.onSelectedNonVegStartersChange}
                selectedItems={this.state.selectedNonVegStarters}
                headerComponent={headerComponent}
                selectedIconComponent={selectedItem}
                unselectedIconComponent={unselectedItem}
              />
            </View>
            <View>
              <SectionedMultiSelect
                searchPlaceholderText="Search.."
                items={this.state.veg_starters}
                uniqueKey="id"
                subKey="children"
                selectText="Veg"
                readOnlyHeadings={true}
                showDropDowns={true}
                readOnlyHeadings={true}
                expandDropDowns={true}
                showCancelButton={true}
                showRemoveAll={true}
                itemFontFamily={{fontFamily:'raleway-extra-bold', fontWeight:'300'}}
                subItemFontFamily={{fontFamily:'raleway-medium', fontWeight:'300'}}
                onSelectedItemsChange={this.onSelectedVegStartersChange}
                selectedItems={this.state.selectedVegStarters}
                headerComponent={headerComponent}
                selectedIconComponent={selectedItem}
                unselectedIconComponent={unselectedItem}
              />
            </View>
          </View>

          <View style={{padding:10, elevation:2, shadowRadius:2, backgroundColor:'#fafafa', marginBottom:10, marginLeft:10, marginRight:10, borderRadius:5}}>
            <Text style={{fontFamily:'raleway-extra-bold', fontWeight:'300'}} h4>Main Course:</Text>
            <View>
              <SectionedMultiSelect
                items={this.state.non_veg_main_course}
                searchPlaceholderText="Search.."
                uniqueKey="id"
                subKey="children"
                selectText="Non Veg"
                showDropDowns={true}
                readOnlyHeadings={true}
                expandDropDowns={true}
                showRemoveAll={true}
                showCancelButton={true}
                readOnlyHeadings={true}
                itemFontFamily={{fontFamily:'raleway-extra-bold', fontWeight:'300'}}
                subItemFontFamily={{fontFamily:'raleway-medium', fontWeight:'300'}}
                onSelectedItemsChange={this.onSelectedNonVegMainCourseChange}
                selectedItems={this.state.selectedNonVegMainCourse}
                headerComponent={headerComponent}
                selectedIconComponent={selectedItem}
                unselectedIconComponent={unselectedItem}
              />
            </View>
            <View>
              <SectionedMultiSelect
                items={this.state.veg_main_course}
                searchPlaceholderText="Search.."
                uniqueKey="id"
                subKey="children"
                selectText="Veg"
                showDropDowns={true}
                readOnlyHeadings={true}
                expandDropDowns={true}
                showCancelButton={true}
                showRemoveAll={true}
                readOnlyHeadings={true}
                itemFontFamily={{fontFamily:'raleway-extra-bold', fontWeight:'300'}}
                subItemFontFamily={{fontFamily:'raleway-medium', fontWeight:'300'}}
                onSelectedItemsChange={this.onSelectedVegMainCourseChange}
                selectedItems={this.state.selectedVegMainCourse}
                headerComponent={headerComponent}
                selectedIconComponent={selectedItem}
                unselectedIconComponent={unselectedItem}
              />
            </View>
          </View>

          <Button onPress={this.onPressBooking} color="#3d8eda" style={styles.booking_button}>Book</Button>
        </View>
      </ScrollView>
    )
  }
}

RestaurantMenuScreen.navigationOptions = {
  headerTransparent: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
