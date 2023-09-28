import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getWebpage } from "@/utils/scrapper";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

export default function Duyurular() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    (async () => {
      const webpage = await getWebpage("https://mobil.trakya.edu.tr/");
      setNews(webpage.announcements);
    })();
  }, []);

  const handlePressButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View>
      <View className="flex flex-row items-center gap-2 m-2">
        <FontAwesome name="bullhorn" size={24} color="black" />
        <Text className="text-xl font-bold">Duyurular</Text>
      </View>

      <ScrollView
        className="flex flex-col "
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        {news.map((news) => {
          return (
            <TouchableOpacity
              key={news.url}
              className="p-2 bg-white border-b border-gray-200"
              onPress={() => handlePressButtonAsync(news.url)}
            >
              <Text className="text-sm font-medium">{news.text}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
