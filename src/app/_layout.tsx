import { Slot, SplashScreen, Stack, Tabs } from "expo-router";
import { View } from "react-native";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
  });
  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarStyle: {
            marginBottom: 10,
            paddingTop: 10,
          },
          header: () => null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Anasayfa",
            tabBarIcon: (props) => (
              <FontAwesome name="home" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="haberler/index"
          options={{
            tabBarLabel: "Haberler",
            tabBarIcon: (props) => (
              <FontAwesome
                name="newspaper-o"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="duyurular/index"
          options={{
            tabBarLabel: "Duyurular",
            tabBarIcon: (props) => (
              <FontAwesome
                name="bullhorn"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="etkinlikler/index"
          options={{
            tabBarLabel: "Etkinlik",
            tabBarIcon: (props) => (
              <FontAwesome
                name="calendar-o"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="diger-haberler/index"
          options={{
            tabBarLabel: "Diğer Haberler",
            tabBarIcon: (props) => (
              <FontAwesome
                name="th-large"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
