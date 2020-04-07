import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function MyScreen() {
    const data = [];
    for(let i = 0; i < 66; i++) {
        data.push({key : 'abcd' + i});
    }
    return (
        <View style={styles.container}>
            <FlatList
            data={data}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
  );
}

MyScreen.navigationOptions = {
  title: 'MyScreen',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black'
  },
});
