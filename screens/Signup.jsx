import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, defaultImg, defaultStyle, formHeading, inputOptions,formStyles as styles, } from '../styles/styles'
import { Avatar, Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import mime from "mime";
import { useMessageAndErrorUser } from '../utils/hooks'
import { register } from '../redux/actions/userAction'

const Signup = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

  const dispatch = useDispatch(); 

  const submitHandler=()=>{ 
   const myForm = new FormData();

      myForm.append("name", name);
      myForm.append("email", email);
      myForm.append("password", password);
      myForm.append("address", address);
      myForm.append("city", city);
      myForm.append("country", country);
      myForm.append("pinCode", pinCode);
  
      if (avatar !== "") {
        myForm.append("file", {
          uri: avatar,
          type: mime.getType(avatar),
          name: avatar.split("/").pop(),
        });
      }
  
      dispatch(register(myForm));

  // console.log({uri: avatar,
  //           type: mime.getType(avatar),
  //           name: avatar.split("/").pop(),})

    }

    const loading = useMessageAndErrorUser(navigation, dispatch, "profile");

    const disableBtn =
    !name || !email || !password || !address || !city || !country || !pinCode;

    useEffect(() => {
      if (route.params?.image) setAvatar(route.params.image);
    }, [route.params]);
  return (
    <View style={defaultStyle}>

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Sign Up</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            padding: 20,
            elevation: 10,
            borderRadius: 10,
            backgroundColor: colors.color3,
            top:10
          }}
        >
          <View style={{ minHeight: 900 }}>
            <Avatar.Image
              style={{
                alignSelf: "center",
                backgroundColor: colors.color1,
              }}
              size={80}
              source={{
                uri: avatar ? avatar : defaultImg,
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
              <Button textColor={colors.color1}>Change Photo</Button>
            </TouchableOpacity>

            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              {...inputOptions}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              {...inputOptions}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              {...inputOptions}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              {...inputOptions}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              {...inputOptions}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />

            <TextInput
              {...inputOptions}
              placeholder="Pin Code"
              value={pinCode}
              onChangeText={setPinCode}
            />

            <Button
              loading={loading}
              textColor={colors.color2}
              disabled={disableBtn}
              style={styles.btn}
              onPress={submitHandler}
            >
              Sign Up
            </Button>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

    </View>
  )
}

export default Signup