import * as SecureStore from "expo-secure-store";

export async function saveToSecureStore(key: string, value: any) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteFromSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function getFromSecureStore(key: string) {
  return await SecureStore.getItemAsync(key);
}
