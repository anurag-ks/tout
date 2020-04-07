import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import MapInput from '../components/MapInput';
import MyMapView from '../components/MapView';
import { getLocation, geocodeLocationByName } from '../services/location-services';

export default class RestaurantLocationScreen extends React.Component {
    state = {
        region: {}
    };

    constructor(props){
      super(props)
      this.confirm = this.confirm.bind(this)
    }

    componentDidMount() {
        this.getInitialState();
    }

    getInitialState() {
        getLocation().then(
            (data) => {
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
        let point = {
          lng: loc.lng,
          lat: loc.lat
        }
    }

    onMapRegionChange(region) {
        this.setState({ region });
    }

    confirm(){
      let point = {
        lng: this.state.region.longitude,
        lat: this.state.region.latitude,
      }
      const { navigation } = this.props;
      navigation.goBack();
      navigation.state.params.setCurrentPosition({ currentPosition: point });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>
                <Button title="Confirm" onPress={this.confirm}/>

                {
                    this.state.region['latitude'] ?
                        <View style={{ flex: 1 }}>
                            <MyMapView
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} />
                        </View> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  }
});
