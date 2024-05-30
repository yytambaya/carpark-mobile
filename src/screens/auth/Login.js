import * as React from "react";
import { useState } from "react";
import { validateName, validateEmail, validatePassword, validatePhoneNumber } from "../../utils/validators";
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Link, Text } from "native-base";
import { getAPIBaseURL, getSiteBaseURL } from "../../utils/helpers";
import { postData } from "../../utils/request";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btnState, setBtnState] = useState("Login");
    const [error, setError] = useState([{field: "email", msg:""}, {field: "password", msg:""}]);
    const [genError, setGenError] = useState("")
    const navigation = useNavigation()
    
    const login = async () => {
        //alert("Email: " + email + " Password: " + password);
        var e_val = validateEmail(email).error == "" ? true: false;
        var p_val = validatePassword(password).error == "" ? true: false;
        
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        
        if(e_val && p_val){
            console.log("fields are okay")
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/user/login`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {email: email, password: password};

            const request = await postData(url, headers, data)
            setBtnState('Login')
            console.log(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    console.log("logged in successfully")
                    AsyncStorage.setItem('_id', request.result.data.result.result._id);
                    AsyncStorage.setItem('jwt_token', request.result.data.result.token);
                    AsyncStorage.setItem('email', request.result.data.result.result.email);
                    AsyncStorage.setItem('name', request.result.data.result.result.name);
                    AsyncStorage.setItem('phoneNumber', request.result.data.result.result.phoneNumber);
                    
                    navigation.navigate('profile') 
                    //window.location.href = `${getSiteBaseURL()}/login`

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                
                //alert(JSON.stringify(request.result.data))
                if(request.result.data?.status == 409){
                    setGenError(request.result.data?.result)
                
                }else if(request.result.data?.status == 403){
                    setGenError(request.result.data?.result)
                }else if(request.result.data?.status == 404){
                    setGenError(request.result.data?.result)
                }else{
                    setGenError("check your form for errors")
                }
            }

        }else{
          console.log("error in forms")
        }

        //setBtnState('Signup')
        
    }  



  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Carpark
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Login
        </Heading>
        <VStack space={3} mt="5">
          {genError ? <Box>
            <Text color="red.500">{genError}</Text>
          </Box> : null }
          
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" onChangeText={(text) => setEmail(text)} />
            {error.find(item => item.field == "email").msg ? <Text color='red.500'>{error.find(item => item.field == "email").msg }</Text>: null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={(text) => setPassword(text)} />
            {error.find(item => item.field == "password").msg ? <Text color={'red.500'}>{error.find(item => item.field == "password").msg }</Text>: null}
          </FormControl>
          <Button onPress={() => login()} mt="2" colorScheme="indigo">
            {btnState}
          </Button>
        </VStack>
        <Button onPress={() => navigation.navigate('signup')} mt="2" variant={'link'} colorScheme="indigo">
            Signup
          </Button>
      </Box>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Login />
            </Center>
          </NativeBaseProvider>
        );
    };
    