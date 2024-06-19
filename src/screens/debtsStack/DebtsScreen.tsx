import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { Backend, Navigation } from '@/types';
import { Colors, Sizing, Typography } from '@/styles';
import useUsersWithDebts from '@/hooks/debtsStack/useUsersWithDebts';
import ErrorText from '@/components/common/ErrorText';
import DebtorsList from '@/components/debtsStack/DebtorsList';

export default function DebtsScreen({ navigation }: Navigation.DebtsNavigationProps): JSX.Element {
  const { error, loading, usersWithDebts } = useUsersWithDebts();

  const handleClick = (debtor: Backend.User): void => {
    const { userId: debtorId, firstName: debtorName } = debtor;
    navigation.navigate('DebtDetails', { debtorId: debtorId, debtorName: debtorName });
  };

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (error) {
    return <ErrorText message="Ha ocurrido un error al cargar tus deudas" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {usersWithDebts.length > 0 ? (
        <>
          <Text style={styles.header}>Tienes deudas con las siguientes personas</Text>
          <DebtorsList debtors={usersWithDebts} onUserPress={handleClick} />
        </>
      ) : (
        <Text style={styles.header}>No tienes deudas pendientes</Text>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Debts')}>
        <AntDesign
          style={styles.addButton}
          name="pluscircle"
          size={Sizing.x40}
          color={Colors.palette.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    ...Typography.bodyStyles.highlight,
    marginTop: Sizing.x10,
  },
  addButton: {
    marginBottom: Sizing.x10,
  },
});
