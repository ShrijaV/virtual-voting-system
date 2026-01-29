import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const backend = "http://127.0.0.1:8000/api";

export default function VoterLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [error, setError] = useState("");

  const router = useRouter();

  // Request OTP
  const requestOtp = async () => {  
    if(!phone || phone.length !==10 || !/^\d+$/.test(phone)){
      setError("Phone no must be 10 digits only");
      return;
    }
    try {
      await axios.post(`${backend}/request-otp/`, { phone });
      setStep("otp");
      setError("");
    } catch (err) {
      setError("Failed to request OTP");
    }
  };


  // Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${backend}/verify-otp/`, { phone, otp });

      const voterId = res.data.voter_id;
      if (!voterId) {
        setError("Invalid OTP");
        return;
      }

      localStorage.setItem("voter_id", voterId);

    router.push({
      pathname: '/voter_dashboard1',
      params: {voter_id:res.data.voter_id}
    });

    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <view style={styles.card}>
      <Text style={styles.title}>Virtual Voting Login</Text>

      {step === "phone" && (
        <>
          <TextInput
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TouchableOpacity style={styles.orangeButton} onPress={requestOtp}>
            <Text style={styles.orangeButtonText}>Request OTP</Text>
          </TouchableOpacity>

           {/* <Button title="Request OTP" onPress={requestOtp} style={styles.orangeButton}/> */}
        </>
      )}

      {step === "otp" && (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
          {/* <Button title="Verify OTP" onPress={verifyOtp} /> */}
          <TouchableOpacity style={styles.orangeButton} onPress={verifyOtp}>
            <Text style={styles.orangeButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
      </view>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // White centered card like screenshot
  card: {
    width: "90%",
    maxWidth: 430,
    backgroundColor: "white",
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  title: { 
    fontSize: 30, 
    fontWeight: "bold",
    marginBottom: 8, 
    textAlign: "center",
    color: "#1b1b1b",
  },

  subtitle: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    height: 55,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    backgroundColor: "#fafafa",
    marginBottom: 18,
    fontSize: 17,
  },

  // ORANGE FULL-WIDTH BUTTON (same as screenshot)
  orangeButton: {
    width: "100%",
    backgroundColor: "#ff6b00",
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  orangeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  error: { 
    color: "red", 
    marginTop: 12,
    textAlign: "center",
    fontSize: 15 
  },
});

