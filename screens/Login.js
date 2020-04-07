import React from 'react'
import { StyleSheet, TextInput, View, Image} from 'react-native'
import { Input, Block, Button, Text} from 'galio-framework'
import * as firebase from 'firebase';


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  restore_password(){

  }

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.image} source={require('../assets/images/logo.jpeg')} />

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


        <Button style={{alignSelf:'center'}} onPress={this.handleLogin} shadowColor="true" color="#3d8eda" >Login</Button>
        <Button style={{alignSelf:'center', marginTop:10}} onPress={() => this.props.navigation.navigate('SignUp')} color="#fafafa" shadowColor="true" >
          <Text color='#3d8eda'>Don't have an account? Sign Up</Text></Button>

      </View>
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
