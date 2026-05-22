import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const styles = StyleSheet.create({
  layout: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    height: "100%",
    color: "white",
  },
  text: {
    fontSize: "20",
    // fontFamily: 'Open Sans',
    fontWeight: "bold",
    color: "white",
  },
});
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar
          hidden={false}
          backgroundColor={"black"}
          networkActivityIndicatorVisible={false}
        />
      </SafeAreaView>
      <View style={styles.layout}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: "https://sessionize.com/image/19ba-400o400o2-SrUNQAVMr1ap3V65nWMD29.jpg",
          }}
        ></Image>
        <Text style={styles.text}>Hello Akshay here</Text>
        <Text style={{ fontSize: "15", color: "white", paddingTop: "20px" }}>
          Based in Bangalore
        </Text>
        <Text style={{ fontSize: "18", color: "white", paddingTop: "20px" }}>
          Tech Speaker with 20+ Talks
        </Text>
        <Text style={{ fontSize: "15", color: "white", paddingTop: "20px" }}>
          Flutter, MERN Stack, Gemini
        </Text>

        <TouchableOpacity
          onPress={(event) => {
            alert("hello");
            router.push("/contact");
          }}
        >
          <Text
            style={{
              paddingLeft: "20",
              paddingRight: "20",
              fontSize: "25",
              color: "Green",
              backgroundColor: "#50C878",
            }}
          >
            Contact Me
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}
