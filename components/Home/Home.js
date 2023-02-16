import { View, StyleSheet, FlatList, Modal, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import FlightCard from "./Card";
import CalendarStrip from "react-native-calendar-strip";
import Icon from "react-native-vector-icons/FontAwesome";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ProfilePicture from "../../assets/profile-picture.png";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CalendarList, Calendar } from "react-native-calendars";
import CalendarMenu from "../Calendar/Calendar";
import {AsyncStorage} from 'react-native';


const myIcon = <Icon name="rocket" size={30} color="#900" />;

export default function Home() {
  const [profileModal, setProfileModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const [todayFlights, setTodayFlights] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [flightDataAdditional, setFlightDataAdditional] = useState([]);

  const userTabel = {
    crewTabelNumber: "4239",
  };

//   const [personalData, setPersonalData] = useState({
//     fullName: "User Userovich",
//     email: "user@mail.com",
//     tel: "+994999999999",
//     tabel: "0000",
//   });
  const [personalData, setPersonalData] = useState({})

  useEffect(() => {
    fetch("http://sofi03.azal.az:8083/api/user/GetFlightsForUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userTabel),
    }).then((resp) => {
      resp.json().then((result) => {
        setFlightData(result);
      });
    });

    }, []);

    useEffect(() => {
        const getItem = async () => {
          try {
            const value = await AsyncStorage.getItem('userInfo'); // get the value of the 'count' key from AsyncStorage
            if (value !== null) {
              setPersonalData(JSON.parse(value))
            } else{
            }
          } catch (error) {
            console.log('Error retrieving count:', error); // log an error message if an error occurs
          }
        };
    
        getItem(); // call the getItem function
      }, []);
    
    useEffect(() => {
    let defData = flightData;
    let resultDefault = [];
    let todayDate = new Date().toISOString().slice(0, 10);
    defData.forEach((item) =>
      item.flightDepartureDateTime.slice(1, 11) === todayDate
        ? resultDefault.push(item)
        : null
    );
    setFlightDataAdditional(resultDefault);
  }, []);

  const handleDataFromCalendar = (data) => {
    const result = [];

    // setDataFromCalendar(data);
    let flData = flightData;
    flData.forEach((item) =>
      item.flightDepartureDateTime.slice(1, 11) === data
        ? result.push(item)
        : null
    );

    setTodayFlights(result);
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="light" />
      <View style={styles.panel}>
        <View style={styles.panelInfo}>
          <View style={styles.profile}>
            <Pressable
              onPress={() => {
                setProfileModal(!profileModal);
              }}
              style={({ pressed }) => pressed && styles.pressedBtn}
            >
              <Icon
                size={50}
                name="user-circle-o"
                style={{ color: "#020d1f" }}
              />
            </Pressable>
          </View>
          <View>
            <Text style={styles.header}>Flights</Text>
            <Text style={styles.username}>{personalData.name+' '+personalData.surname}</Text>
          </View>
          <View>
            <Pressable style={({ pressed }) => pressed && styles.pressedBtn}>
              <Icon name="calendar" size={40} style={{ color: "#020d1f" }} />
            </Pressable>
          </View>
        </View>
        <View style={styles.calendar}>
          <CalendarMenu onData={handleDataFromCalendar} />
        </View>
      </View>
      <View style={styles.cardHolder}>
        {flightDataAdditional.length !== 0 && todayFlights.length === 0 ? (
          <FlatList
            style={styles.listHolder}
            data={flightDataAdditional}
            renderItem={(item) => {
              return (
                <View style={styles.listCardHolder}>
                  <FlightCard
                    flightNum={item}
                    flightData={flightDataAdditional}
                  />
                </View>
              );
            }}
          />
        ) : flightDataAdditional.length === 0 && todayFlights.length !== 0 ? (
          <FlatList
            style={styles.listHolder}
            data={todayFlights}
            renderItem={(item) => {
              return (
                <View style={styles.listCardHolder}>
                  <FlightCard flightNum={item} flightData={todayFlights} />
                </View>
              );
            }}
          />
        ) : flightDataAdditional.length === 0 && todayFlights.length === 0 ? (
          <Text>No flights found</Text>
        ) : null}
      </View>
      <View style={styles.panelBottom}>
        <View style={styles.panelBtnContainer}>
          <Pressable style={styles.panelBtn}>
            <Icon
              name="plane"
              size={25}
              style={{ color: "#fff", marginRight: 10 }}
            />
            <Text style={styles.panelBtnText}>Flights</Text>
          </Pressable>
        </View>
        <View style={styles.panelBtnContainer}>
          <Pressable style={styles.panelBtn}>
            <Icon
              name="file-text"
              size={25}
              style={{ color: "#fff", marginRight: 10 }}
            />
            <Text style={styles.panelBtnText}>Reports</Text>
          </Pressable>
        </View>
        <View style={styles.panelBtnContainer}>
          <Pressable style={styles.panelBtn}>
            <Icon
              name="book"
              size={25}
              style={{ color: "#fff", marginRight: 10 }}
            />
            <Text style={styles.panelBtnText}>Manuals</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={profileModal} animationType={"slide"}>
        <StatusBar style="light" />

        <View style={styles.modalContainer}>
          <View style={styles.modalCloseBtn}>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "9%",
              }}
              onPress={() => {
                setProfileModal(!profileModal);
              }}
            >
              <Text style={{ marginTop: -8, fontSize: 28, color: "#fff" }}>
                &#8249;
              </Text>
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalPP}>
            <Image source={personalData.foto} style={styles.profilePic} />
          </View>
          <View>
            <View style={styles.modalTextHolder}>
              <Icon style={styles.userData2} name="user" />
              <Text style={styles.userData}>{personalData.name+' '+personalData.surname}</Text>
            </View>
            <View style={styles.modalTextHolder}>
              <Icon style={styles.userData2} name="id-card" />
              <Text style={styles.userData}> {personalData.tabel}</Text>
            </View>
            <View style={styles.modalTextHolder}>
              <Icon style={styles.userData2} name="envelope" />
              <Text style={styles.userData}> {personalData.telefon}</Text>
            </View>
            <View style={styles.modalTextHolder}>
              <Icon style={styles.userData2} name="phone" />
              <Text style={styles.userData}> {personalData.email}</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={calendarModal}
        style={{ margin: 0, height: 300 }}
        presentationStyle={"formSheet"}
        animationType={"fade"}
      >
        <Pressable
          style={{ alignSelf: "flex-end", padding: 20, flex: 1 }}
          onPress={() => setCalendarModal(!calendarModal)}
        >
          <Text style={{ fontSize: 20 }}>x</Text>
        </Pressable>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            height: "100%",
            alignContent: "center",
            flex: 9,
          }}
        >
          <Calendar
            style={{
              width: "100%",
              alignSelf: "center",
              marginBottom: 70,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#01417d",
    flex: 1,
    width: "100%",
    // paddingTop: 30,
    height: "100%",
  },
  cardHolder: {
    flex: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listHolder: {
    width: "100%",
  },
  listCardHolder: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  panel: {
    flex: 2,
    backgroundColor: "#dcdaf5",
    marginBottom: 40,
  },
  panelBottom: {
    flex: 1,
    backgroundColor: "#1e5a92",
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  calendar: {
    flex: 1,
    marginBottom: 20,
  },
  panelInfo: {
    flex: 2,
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'transparent'
  },
  profile: {
    backgroundColor: "transparent",
    backgroundColor: "#dcdaf5",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    marginTop: -40,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#020d1f",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#020d1f",
  },
  panelBtn: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "33%",
  },
  panelBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  panelBtnContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  // -----------Profile Modal-----------------
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: "100%",
  },
  modalContainer: {
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    // padding: 100,
    backgroundColor: "#01417d",
    flex: 1,
  },
  userData: {
    fontSize: 24,
    letterSpacing: 2,
    color: "#fff",
    padding: 30,
    marginLeft: -15,
  },
  userData2: {
    fontSize: 24,
    color: "#fff",
    padding: 30,
    width: 30,
    height: 30,
  },
  modalTextHolder: {
    width: 500,
    backgroundColor: "#023361",
    borderRadius: 20,
    marginTop: 30,
    flexDirection: "row",
  },
  modalPP: {
    width: 165,
    height: 165,
    backgroundColor: "#023361",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    marginBottom: 30,
  },
  modalCloseBtn: {
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 100,
    marginLeft: 20,
  },
  closeBtnText: {
    fontSize: 18,
    color: "#fff",
  },
  pressedBtn: {
    opacity: 0.6,
  },
});
