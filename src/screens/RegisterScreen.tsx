import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { type Navigation } from '../types';
import { Sizing, Typography } from '../styles';
import Button from '../components/common/Button';
import CustomTextInput from '../components/common/CustomTextInput';

export default function RegisterScreen({
  navigation,
}: Navigation.RegisterNavigationProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        </TouchableOpacity>
        <Text style={styles.subheader}>PiggyWallet</Text>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.header}>¡Bienvenido/a!</Text>
          <Text style={styles.body}>Registrate para organizar tus finanzas</Text>
          <CustomTextInput placeholder="Nombre completo" />
          <CustomTextInput placeholder="RUT" />
          <CustomTextInput
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          <CustomTextInput placeholder="Correo electrónico" textContentType="emailAddress" />
          <View style={styles.passwordContainer}>
            <CustomTextInput
              placeholder="Contraseña"
              textContentType="password"
              secureTextEntry={!showPassword}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              style={styles.passwordIcon}
              onPress={toggleShowPassword}
            />
          </View>
          <View style={styles.passwordContainer}>
            <CustomTextInput
              placeholder="Confirmar contraseña"
              textContentType="password"
              secureTextEntry={!showConfirmPassword}
            />
            <MaterialCommunityIcons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              style={styles.passwordIcon}
              onPress={toggleShowConfirmPassword}
            />
          </View>
          <Button>Registrarme</Button>
          <Button variant="text" onPress={() => navigation.navigate('Login')}>
            Ya tengo cuenta
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizing.layout.x10,
    marginLeft: Sizing.layout.x15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizing.layout.x20,
  },
  passwordContainer: {
    position: 'relative',
  },
  logo: {
    width: Sizing.screen.width * 0.25,
    height: Sizing.screen.width * 0.25,
  },
  passwordIcon: {
    position: 'absolute',
    right: Sizing.layout.x30,
    top: Sizing.layout.x25,
  },
  header: {
    ...Typography.headerStyles.small,
    padding: Sizing.layout.x10,
  },
  subheader: {
    ...Typography.subheaderStyles.bold,
  },
  body: {
    ...Typography.subheaderStyles.regular,
    marginBottom: Sizing.layout.x20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
