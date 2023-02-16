import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function CalendarMenu(props) {
  const [todayStyle, setTodayStyle] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();
  const todayFull = currentDate.toLocaleDateString();
  const todayFullStyle = new Date().toISOString().slice(0, 10);
  const today = currentDate.getDate();
  let shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format;
  const monthNow = shortMonthName(currentDate);
  const futureDateArr = [];
  const pastDateArr = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + 1 + i);
    futureDateArr.push({
      month: shortMonthName(date),
      day: date.getDate(),
      fullDate: date,
    });
  }

  for (let i = 0; i > -3; i--) {
    const date = new Date();
    date.setDate(date.getDate() - 1 + i);
    pastDateArr.push({
      month: shortMonthName(date),
      day: date.getDate(),
      fullDate: date,
    });
  }
  const pastDateRender = pastDateArr.reverse();
  // const [selectedDate, setSelectedDate] = useState('')
  const notToday = (item) => {
    setTodayStyle(true);
    setSelectedDate(item.fullDate.toISOString().slice(0, 10));
    props.onData(item.fullDate.toISOString().slice(0, 10));
  };

  return (
    <View style={styles.main}>
      <ScrollView horizontal="true">
        <View style={styles.calendarContainer}>
          <View style={styles.dateCont}>
          {pastDateRender.map((item, i) => {
  return (
    <View style={item.fullDate.toISOString().slice(0, 10) === selectedDate ? styles.todayView : null} key={i}>
      <Pressable onPress={() => notToday(item)}>
      <View style={[item.fullDate.toISOString().slice(0, 10) === selectedDate ? styles.selectedDateText : null]}>
          <Text style={[styles.calendarText]}>{item.month}</Text>
          <Text style={[styles.calendarText]}>{item.day}</Text>
        </View>
      </Pressable>
    </View>
  );
})}
<View style={todayStyle ? styles.todayView : null}>
  <Pressable onPress={() => notToday({ fullDate: new Date() })}>
    <View style={[selectedDate === todayFullStyle ? styles.selectedDateText : null]}>
      <Text style={[styles.calendarText]}>{monthNow}</Text>
      <Text style={[styles.calendarText]}>{today}</Text>
    </View>
  </Pressable>
</View>
{futureDateArr.map((item, i) => {
  return (
    <View style={!todayStyle ? styles.todayView : null} key={i}>
      <Pressable onPress={() => notToday(item)}>
        <View style={[item.fullDate.toISOString().slice(0, 10) === selectedDate ? styles.selectedDateText : null]}>
          <Text style={[styles.calendarText]}>{item.month}</Text>
          <Text style={[styles.calendarText]}>{item.day}</Text>
        </View>
      </Pressable>
    </View>
  );
})}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    backgroundColor: "#dcdaf5",
    height: 70,
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  calendarContainer: {
    width: "100%",
    flexDirection: "row",
    // padding: 40,
    justifyContent: "center",
  },
  dateCont: {
    flexDirection: "row",
    // backgroundColor: "white",
    justifyContent: "space-around",
    width: "100%",
    flex: 1,
  },
  calendarText: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  today: {
    // color: 'white'
  },
  // todayView:{
  //   borderRadius: 10,
  //   backgroundColor: "#9995c2",
  //   padding: 2

  // },
  pastDates: {
    flexDirection: "row-reverse",
    color: "red",
    
  },
  calendarText: {
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    borderRadius: 10,


  },
  selectedDateText: {
    borderRadius: 10,
borderWidth: 1,
    backgroundColor: "#9995c2",

    color: "#ffffff",

  }
});
