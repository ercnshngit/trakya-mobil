import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mvs, vs } from "@/utils/scale";
import { useAuth } from "@/contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Login } from "@/types/auth";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { dispatch } = useAuth();
  const mutation = useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (response) => {
      if (response.status === 200) {
        dispatch({ type: "LOGIN", payload: response.data });
      }
    },
    onSettled: () => {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    mutation.mutate(data);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-gray-200"
      style={{
        paddingHorizontal: mvs(30),
        paddingTop: vs(60),
      }}
    >
      <View>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="**********"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {errors.email && (
          <View className="flex flex-row items-center gap-2 pt-4">
            <AntDesign name="exclamationcircle" size={18} color="red" />
            <Text className="text-sm font-bold text-red-500">
              {errors.email.message}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Giriş Yap</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
