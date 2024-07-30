import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Recipes() {

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <View style={styles.textContainer} >
          <Text style={styles.text} >Under Construction <Ionicons name="construct-outline" size={30} color="#F5A318"/> </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40146B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5A318',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5A318'
  },
  textContainer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5A318',
    justifyContent: 'center',
    alignContent: 'center'
  }
});
