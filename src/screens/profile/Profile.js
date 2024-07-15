import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Container, useSafeArea, IconButton, Icon, Flex } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const navigation = useNavigation()
  
  useEffect(() => {
    //console.log('Email:' + getItem('email'))
    //setName(getItem('name'))
    //setEmail(getItem('email'))
    //setPhoneNumber(getItem('phoneNumber'))
    getItems()
  }, [])

   const getItems = async () => {
    try{
      //const value = await AsyncStorage.getItem(key)
      const nameVal = await AsyncStorage.getItem('name')
      const emailVal = await AsyncStorage.getItem('email')
      const phoneNumberVal = await AsyncStorage.getItem('phoneNumber')
      setName(nameVal)
      setEmail(emailVal)
      setPhoneNumber(phoneNumberVal)
      //console.log(temVal)
      
    }catch(error){
      console.log("Get item error: " + error)
    }
   } 

    return(
    <NativeBaseProvider>
        <Container flex={1} px="3">

   <Container w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Flex alignItems={'center'} direction='row'>
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Profile
        </Heading>
        </Flex>
        <Heading mt="1" color="coolGray.400" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          user details
        </Heading>
        <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input  value={name} _disabled={true}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input  value={email} _disabled={true}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input type="text" value={phoneNumber} _disabled={true}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Status</FormControl.Label>
            <Input type="text" value="active" _disabled={true}  />
          </FormControl>
          {/*<Button mt="2" colorScheme="indigo">
            Sign up 2
          </Button>*/}
        </VStack>
        {/*<Link href="/signup" mt="2" colorScheme="indigo">
            Login
        </Link>*/}
      </Box>
    </Container>
    </Container>
    </NativeBaseProvider>
)}
    