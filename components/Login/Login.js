import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Modal,
} from "react-native";
import logo from "../../assets/AZAL.png";
import loader from "../../assets/loading.gif";
import { LinearGradient } from "expo-linear-gradient";
import {AsyncStorage} from 'react-native';


export default function Login({navigation}) {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const usernameHandler = (value) => {
    setUsername(value);
  };
  const passwordHandler = (value) => {
    setPassword(value);
  };

  const userData = {
    Tabel: username,
    Password: password,
  };


  const signIn = () => {
    navigation.navigate('Home')
    // console.log(JSON.stringify(userData));
    fetch("http://sofi03.azal.az:8083/api/user/userlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((resp) => {
      resp.json().then((result) => {
        // console.log(username===result.tabel);
        if (result.tabel === username) {
          // localStorage.setItem('username', result.tabel)
          // localStorage.setItem('fullname', `${result.name} ${result.surname}`)
          // navigate('/home/profile')
          setUserInfo(result);
        } else {
            alert("Incorrect login or password!");
        }
    });
});
// console.log(userInfo);
    const setItem = async (key, value) => {
        try {
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        //   console.log('success'+userInfo);
        } catch (error) {
          console.log("Error saving item: ", error);
        }
      };
    setItem()
  };
  

  return (
    <LinearGradient
      colors={["white", "#3b5998", "#3240a8"]}
      style={styles.linearGradient}
    >
      <View style={styles.loginContainer}>
        <Image style={styles.logo} source={logo} />

        <TextInput
          style={styles.loginInput}
          placeholder="Username"
          onChangeText={usernameHandler}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={passwordHandler}
        />

        <Pressable style={styles.loginBtn} onPress={signIn}>
          <Text style={styles.loginBtnText}>Sign in</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  loginInput: {
    borderWidth: 1,
    padding: 10,
    width: "45%",
    margin: 20,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  loginBtn: {
    width: "30%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white",
  },
  loginBtnText: {
    color: "4c669f",
    fontWeight: "bold",
    color: "#192f6a",
    fontSize: 20,
    letterSpacing: 3,
  },
  logo: {
    width: 350,
    height: 250,
    marginBottom: 100,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
  },
  loader: {
    // display: 'none',
    borderRadius: 20,
    width: 100,
    height: 100,
  },
  modal: {
    width: "10%",
    height: "10%",
  },
});
