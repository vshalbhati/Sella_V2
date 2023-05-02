import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../constants';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';


const Cart = ({navigation}) => {
    const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
            />
          ),
          headerTitle: '',
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <View style={styles.cartItemContainer}>
        <View style={styles.cartItem}>
          <Image source={require('../assets/images/kemal.jpeg')} style={styles.cartItemImage} />
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemName}>Product 1</Text>
            <Text style={styles.cartItemPrice}>$20</Text>
          </View>
        </View>
        <View style={styles.cartItem}>
          <Image source={require('../assets/images/kemal.jpeg')} style={styles.cartItemImage} />
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemName}>Product 2</Text>
            <Text style={styles.cartItemPrice}>$30</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Total: $50</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('prepare')}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cartItemContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: SIZES.body4,
    color: COLORS.gray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    footerText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkoutButton: {
      backgroundColor: '#ff6600',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Cart