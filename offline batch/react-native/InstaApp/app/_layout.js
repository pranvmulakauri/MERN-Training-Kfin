import { Stack } from "expo-router";
import { AuthProvider } from "../state-management/AuthContext";
export default function RootLayout() {
  return <AuthProvider>
    <Stack screenOptions={{ headerShown: false }} />;
  </AuthProvider>;
}
