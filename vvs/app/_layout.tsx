import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';



export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'index' }} />
        <Stack.Screen name="voter_login1" options={{ headerShown: false, title: 'Voter' }} />
        <Stack.Screen name="otp" options={{ headerShown: false, title: 'OTP' }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false, title: 'dashboard' }} />
        <Stack.Screen name="voter_dashboard1" options={{ headerShown:false, title: 'Verify' }} />
        <Stack.Screen name="ad_login1" options={{ headerShown:false, title: 'Administrator Login' }} />
        <Stack.Screen name="electionOfficer1" options={{ headerShown:false, title: 'Election Officer' }} />
        <Stack.Screen name="menu" options={{ headerShown:false, title: 'Menu' }} />
      </Stack>
  );
}
