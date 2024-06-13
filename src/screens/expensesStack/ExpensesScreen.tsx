import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Colors, Sizing } from '../../styles';
import FilterComponent from '../../components/charts/FilterComponent';
import ExpenseCard from '../../components/expenses/ExpenseCard';
import type { ExpensesNavigationProps } from '../../types/navigation';
import db from '../../../db.json';
import type { Expense, UserExpenseType } from '../../types/components';
import { isSameMonth, parseISO } from 'date-fns';

export default function ExpensesScreen({ navigation }: ExpensesNavigationProps): JSX.Element {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [userExpenseTypes, setUserExpenseTypes] = useState<UserExpenseType[]>([]);
  const [filter, setFilter] = useState<string>('todo');

  useEffect(() => {
    setExpenses(db.expenses.map((expense) => ({ ...expense, description: '' }))); 
    setUserExpenseTypes(db.userexpensetypes);
  }, []);

  const handleDelete = (id: number): void => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    Alert.alert('Gasto eliminado');
  };

  const handleAddExpense = (newExpense: Expense): void => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleEditExpense = (updatedExpense: Expense): void => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
    Alert.alert('Gasto editado');
  };

  const getUserExpenseTypeDescription = (id: number): string => {
    const userExpenseType = userExpenseTypes.find((type) => type.id === id);
    return userExpenseType?.description ?? 'Unknown';
  };

  const filterExpenses = (): Expense[] => {
    const currentDate = new Date();

    if (filter === 'todo') return expenses;
    if (filter === 'mensual') {
      return expenses.filter(expense => isSameMonth(parseISO(expense.created_at), currentDate));
    }
    if (filter === 'ahorro') {
      return expenses.filter(expense => isSameMonth(parseISO(expense.created_at), currentDate));
    }
    return expenses;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterComponent />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filterExpenses().map((expense) => (
          <ExpenseCard 
          key={expense.id} 
          expense={{
            ...expense, 
            userexpensetype_id: getUserExpenseTypeDescription(expense.userexpensetype_id)
          }} 
          onDelete={() => handleDelete(expense.id)} 
          onEdit={(expense : Expense) => navigation.navigate('EditExpense', { expense, onSave: handleEditExpense })}
          onLook={(expense : Expense) => navigation.navigate('ExpenseDetails', { expense })}
        />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('AddExpense', { onAddExpense: handleAddExpense })} style={styles.addButtonContainer}>
        <AntDesign
          name="pluscircle"
          size={Sizing.x40}
          color={Colors.palette.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.background,
  },
  filterContainer: {
    zIndex: 1,
    backgroundColor: Colors.palette.background,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: Sizing.x20,
    right: Sizing.x20,
    zIndex: 1,
  },
  scrollContainer: {
    padding: Sizing.x20,
    paddingBottom: Sizing.x60,
    paddingTop: Sizing.x100, 
  },
});
