import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getWebpage } from "@/utils/scrapper";
import clsx from "clsx";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

export default function Page() {
  const [banners, setBanners] = useState([]);
  const [date, setDate] = useState(null);
  const [meal, setMeal] = useState(null);
  const socials = [
    {
      label: "Facebook",
      url: "https://www.facebook.com/trakyauniversitesirektorlugu",
      color: "bg-blue-500",
      Icon: <FontAwesome name="facebook" size={24} color="#ffffff" />,
    },
    {
      label: "Twitter",
      url: "https://twitter.com/trakya_univ",
      color: "bg-blue-400",
      Icon: <FontAwesome name="twitter" size={24} color="#ffffff" />,
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/trakya.univ",
      color: "bg-pink-500",
      Icon: <FontAwesome name="instagram" size={24} color="#ffffff" />,
    },
    {
      label: "Youtube",
      url: "https://www.youtube.com/user/trakya_univ",
      color: "bg-red-500",
      Icon: <FontAwesome name="youtube" size={24} color="#ffffff" />,
    },
  ];

  const menu = [
    {
      label: "Öğrenci Etkinlikleri",
      url: "https://sks.trakya.edu.tr/news_cats/ogrenci-etkinlikleri",
      color: "bg-red-500",
      Icon: <FontAwesome name="calendar" size={24} color="#212836" />,
    },
    {
      label: "Akademik Takvim",
      url: "https://mobil.trakya.edu.tr/files/akademik-takvim.pdf",
      color: "bg-yellow-500",
      Icon: <FontAwesome name="calendar-o" size={24} color="#212836" />,
    },
    {
      label: "Yemek\nListesi",
      url: "https://www.trakya.edu.tr/yemeklistesi",
      color: "bg-blue-500",
      Icon: (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={24}
          color="#212836"
        />
      ),
    },
    {
      label: "Radyo Günebakan",
      url: "http://radyogunebakancanli.trakya.edu.tr/",
      color: "bg-green-500",
      Icon: <Feather name="radio" size={24} color="#212836" />,
    },
    {
      label: "Personel Rehberi",
      url: "https://www.trakya.edu.tr/personel/",
      color: "bg-purple-500",
      Icon: <Ionicons name="people" size={24} color="#212836" />,
    },
    {
      label: "ABS / OBS Uygulaması",
      url: "https://play.google.com/store/apps/details?id=com.SMSMobile.Trakya&hl=tr&gl=US",
      color: "bg-pink-500",
      Icon: <Entypo name="google-play" size={24} color="#212836" />,
    },
  ];

  useEffect(() => {
    (async () => {
      const webpage = await getWebpage("https://mobil.trakya.edu.tr/");
      setBanners(webpage.banners);
      setDate(webpage.date);
      setMeal(webpage.meal);
    })();
  }, []);
  const handlePressButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return (
    <View className="flex flex-col flex-1 w-full ">
      <View className="flex flex-row items-center justify-between h-12 pr-2 shadow shadow-black/25 bg-primary-blue-500">
        <View className="flex items-start flex-1 h-full ">
          <TouchableOpacity
            onPress={() =>
              handlePressButtonAsync("https://teknokta.trakya.edu.tr/")
            }
            className="flex flex-row items-center justify-center w-12 h-full bg-primary-yellow-500"
          >
            <FontAwesome name="user" size={24} color="white" className="" />
          </TouchableOpacity>
        </View>
        <View className="flex items-center flex-1">
          <Image
            className="w-8 h-8"
            source={{ uri: "https://www.trakya.edu.tr/images/logo.png" }}
          />
        </View>
        <View className="flex items-end flex-1">
          <Text className="text-xs font-medium text-white">
            {date?.split("+")[0]}
          </Text>
          <Text className="text-xs font-medium text-white">
            {date?.split("+")[1]}
          </Text>
        </View>
      </View>
      <ScrollView horizontal pagingEnabled className="flex flex-1 w-full">
        {banners.map((banner) => {
          return (
            <View key={banner}>
              <Image
                source={{ uri: banner }}
                className="w-screen h-full"
                resizeMode="stretch"
              />
            </View>
          );
        })}
      </ScrollView>
      <View className="">
        <View className="flex items-center justify-center py-2 mx-2 mt-2 border rounded-md border-primary-blue-500">
          <View className="flex flex-row items-center gap-2">
            <MaterialCommunityIcons name="chef-hat" size={22} color="#1B2870" />
            <Text className="font-bold text-primary-blue-500">
              {meal?.split("+")[0]}
            </Text>
          </View>
          <ScrollView horizontal className="pt-2 mx-2">
            {meal
              ?.split("+")[1]
              .split("-")
              .map((m) => (
                <View key={m} className="px-1">
                  <View className="p-1 rounded-lg bg-primary-yellow-500">
                    <Text className="text-xs text-white">{m}</Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
      <View className="flex flex-row flex-wrap flex-1 pt-1 mx-2 ">
        {menu.map((m) => (
          <View className="flex items-center w-1/3 p-1 h-1/2" key={m.label}>
            <TouchableOpacity
              onPress={() => handlePressButtonAsync(m.url)}
              className={clsx(
                "flex w-full overflow-hidden h-full items-center justify-center pb-2 px-2 rounded-lg bg-gray-200  shadow-black/25"
              )}
            >
              <View className="">{m.Icon}</View>
              <View className="w-1 h-1" />
              <View className="">
                <Text className="text-xs font-medium text-center text-gray-800 ">
                  {m.label}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View className="flex flex-row flex-wrap pb-1 mx-2">
        {socials.map((m) => (
          <View className="flex items-center w-1/4 p-1" key={m.label}>
            <TouchableOpacity
              onPress={() => handlePressButtonAsync(m.url)}
              className={clsx(
                "flex w-full overflow-hidden items-center justify-center py-2 px-2 rounded-lg  shadow-black/25",
                m.color
              )}
            >
              <View className="">{m.Icon}</View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
