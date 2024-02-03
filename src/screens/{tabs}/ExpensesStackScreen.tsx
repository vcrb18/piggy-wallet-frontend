import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpensesScreen from '../expensesStack/ExpensesScreen';
import AddExpenseScreen from '../expensesStack/AddExpenseScreen';
import type { ExpensesStackParamsList } from '../../types/navigation';

const ExpensesStack = createNativeStackNavigator<ExpensesStackParamsList>();

export default function ExpensesStackScreen(): JSX.Element {
  return (
    <ExpensesStack.Navigator>
      <ExpensesStack.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExpensesStack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </ExpensesStack.Navigator>
  );
}
