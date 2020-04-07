import React from 'react'
import { StyleSheet, TextInput, View, Picker, Image, ScrollView} from 'react-native'
import { Input, Block, Button, Text, Radio} from 'galio-framework'
import * as firebase from 'firebase';


export default class SignUp extends React.Component {

    state = { email: '', password: '', errorMessage: null, full_name: '', phone_number:'', gender:''}
    handleSignUp = () => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((userCredentials)=>{
              if(userCredentials.user){
                userCredentials.user.updateProfile({
                  displayName: this.state.full_name
                }).then((s)=> {
                  let user_uid = firebase.auth().currentUser.uid;
                  let gender = this.state.gender;
                  firebase.database().ref('users/').push({
                      user_uid,
                      gender,
                    }).then((data)=>{
                        this.props.navigation.navigate('Main');
                        alert("Welcome!");
                    }).catch((error)=>{
                        alert(error.message);
                    })

                })
              }
          })
          .catch(function(error) {
            alert(error.message);
          });
      console.log('handleSignUp')
    }
    render() {
        return (
          <ScrollView style={{backgroundColor:'#e2e3ed'}}>
          <View style={styles.container}>

          <Image resizeMode='stretch' style={styles.image} source={require('../assets/images/logo.jpeg')} />

          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

            <Input
              placeholder="Full Name"
              autoCapitalize="none"
              onChangeText={full_name => this.setState({ full_name })}
              value={this.state.full_name}
            />

            <Input
              type="email-address"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <Input
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <View style={{padding:10}}>
              <Text muted>Select Gender:</Text>
              <Picker
                selectedValue={this.state.gender}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({gender: itemValue})
                }>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>

            <Input
              type="phone-pad"
              placeholder="Phone Number"
              autoCapitalize="none"
              onChangeText={phone_number => this.setState({ phone_number })}
              value={this.state.phone_number}
            />

            <Button style={{alignSelf:'center'}} onPress={this.handleSignUp} shadowColor="true" color="#3d8eda">Sign Up</Button>

            <Button style={{alignSelf:'center', marginTop:10,}} onPress={() => this.props.navigation.navigate('Login')} shadowColor="true" color="#fafafa">
              <Text color="#3d8eda">Already have an account? Login</Text>
            </Button>

          </View>
          </ScrollView>

        )
      }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#e2e3ed'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  image:{
    width:200,
    height:200,
  }
})
