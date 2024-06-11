import { StyleSheet, View, Text } from 'react-native';
import { Typography } from '@/styles';

export default function AddPiggyScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agrega Piggies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...Typography.headerStyles.small,
  },
});
