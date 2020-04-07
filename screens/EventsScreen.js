import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Content, H2, Icon, Text, Button} from 'native-base';


export default class EventsScreen extends React.Component{

  constructor(props){
    super(props)
  }

  openGenre(selectedGenre){
    this.props.navigation.navigate('EventsListScreen', {genre: selectedGenre})
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
        <H2 style={{alignSelf:'center', fontFamily:'raleway-extra-bold', fontWeight:'300', marginBottom:20}}>Browse Events By Genre</H2>

        <Content>
          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Comedy'})}>
            <Icon name='microphone' />
            <Text>Comedy</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Trek'})}>
            <Icon name='clock' />
            <Text>Trek</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Adventure'})}>
            <Icon name='bicycle' />
            <Text>Adventure</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Music'})}>
            <Icon name='musical-notes' />
            <Text>Music</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Art'})}>
            <Icon name='rose' />
            <Text>Art</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Dance'})}>
            <Icon name='walk' />
            <Text>Dance</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Painting'})}>
            <Icon name='brush' />
            <Text>Painting</Text>
          </Button>

          <Button iconLeft light style={{marginTop:5, marginLeft:15, marginRight:15, marginBottom:5}} onPress={() => navigate('EventsListScreen', {genre: 'Screening'})}>
            <Icon name='videocam' />
            <Text>Screening</Text>
          </Button>
        </Content>

      </ScrollView>

    )
  }
}

EventsScreen.navigationOptions = {
  headerTransparent: true,
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
});
