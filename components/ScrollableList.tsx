import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Text, View } from './Themed';
import React from 'react'

const jamListTest = ["jams das quintas", "jam sensations", "irokumata", "aiaiai o cu do teu pai"];

const ScrollableList = ( {title}:any ) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
        data={jamListTest}
        renderItem={({ item }) => (
            <TouchableOpacity 
            style={styles.tab} 
            onPress={() => {
                //   router.push(`/search/${item}`)
                }}>
                <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ gap: 10 }}
        horizontal
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: "grey",
      height: 200,
      width: 300,
    },
  });
  

export default ScrollableList