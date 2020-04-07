import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, View, ScrollView, Image, Dimensions, Platform, TouchableOpacity} from 'react-native';
import { Content, H2, Icon, Text, Button} from 'native-base';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import Modal from "react-native-modal";


const { width: screenWidth } = Dimensions.get('window')

export default class EventsListScreen extends React.Component{

  state : {
    genre : ' ';
    events: [];
    activeSlide:0;
    isVisible:false;
  }

  constructor(props){
    super(props)

    this.state = {
      genre : " ",
      events: [],
      activeSlide:0,
      isVisible:false,
    }
  }

  componentDidMount(){
    console.log(this.props.navigation.getParam('genre'))
    let genre = this.props.navigation.getParam('genre')
    this.setState({genre:genre})

    let eventsList = [];
    firebase.database().ref('Events/'+genre.toLowerCase()).on("value", snapshot =>{
      eventsList = [];
      snapshot.forEach((childSub) => {
        let currentObj = childSub.val();
        eventsList.push(childSub.val());
       });
       console.log(eventsList);
       this.setState({events:eventsList})
    })
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _renderItem ({item, index}, parallaxProps) {
      return (
          <View style={styles.item}>
              <ParallaxImage
                  source={{ uri: item.image_url }}
                  containerStyle={styles.imageContainer}
                  style={styles.image}
                  parallaxFactor={0.4}
                  {...parallaxProps}
              />
            <H2 style={styles.title} numberOfLines={2}>
                { item.event_name }
            </H2>
            <Text style={{fontFamily:'raleway-medium', fontWeight:'300'}} numberOfLines={2}>
                Date: { item.date }
            </Text>
            <Text style={{fontFamily:'raleway-medium', fontWeight:'300'}} numberOfLines={2}>
                INR { item.price }
            </Text>
            <Text style={{fontFamily:'raleway-medium', fontWeight:'300'}} numberOfLines={2}>
                At { item.location }
            </Text>
          </View>
      );
  }

  get pagination () {
      const { events, activeSlide } = this.state;
      return (

          <Pagination
            dotsLength={events.length}
            activeDotIndex={activeSlide}
            containerStyle={{}}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: '#3d8eda'
            }}
            inactiveDotStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.34)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }

  render(){
    let content;
    if(this.state.events.length==0){
      content = <Text style={{fontFamily:'raleway-extra-bold', fontWeight:'300', alignSelf:'center'}}>No Events</Text>
    }
    else{
      content = <Carousel
                  sliderWidth={screenWidth}
                  sliderHeight={screenWidth}
                  itemWidth={screenWidth - 60}
                  data={this.state.events}
                  renderItem={this._renderItem}
                  hasParallaxImages={true}
                  onSnapToItem={(index) => this.setState({ activeSlide: index })}
              />
              { this.pagination }
    }
    return(
      <ScrollView style={styles.container}>
        <H2 style={{fontFamily:'raleway-extra-bold', fontWeight:'300', alignSelf:'center', marginBottom:40}}>{this.state.genre} Events</H2>
        {content}
      </ScrollView>

    )
  }
}

EventsListScreen.navigationOptions = {
  headerTransparent:true
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop:50,

  },
  card: {
    alignItems:'center',
    padding:10,
    backgroundColor:'#fafafa',
    elevation:5,
    width:150,
    height:150,
    borderRadius:10
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    marginBottom: 15,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'raleway-extra-bold',
    fontWeight: '300'
  }
});
