import { Link } from "expo-router";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Appearance } from "react-native";

const login=()=> {
  return(
    <>
      
      <View style={styles.container}>
        <Text style={styles.title}>Virtual Elections</Text>
        <Text style={styles.text}>A Secure platform that allows candidates to cast their vote digitally from anywhere.</Text>
        <Link href="/voter_login1" style={{marginHorizontal:'auto'}} asChild>
          <Pressable style={styles.button1}>
            <Text style={styles.buttonText}>Voter Login</Text>
          </Pressable> 
        </Link>
        <Link href="/electionOfficer1" style={{marginHorizontal:'auto'}} asChild>
            <Pressable style={styles.button2}>
              <Text style={styles.buttonText1}>Election Officer Login</Text>
            </Pressable>
        </Link>
      </View>
    </>
  )
}
export default login

const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 'auto',
  },
  text:{
    color: 'grey',
    fontSize: 25,
    fontWeight: 'light',
    textAlign: 'center',
    marginBottom: 80,
  },
  title :{
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 80,
    marginTop: 50,
  },
   button1: {
    height: 50,
    width: 130,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'orange',
    padding: 6,
    border: '3px solid orange',
    marginBottom: 50,
  },
  button2: {
    height: 50,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 6,
    border: '0.5px solid grey',
    marginBottom: 50,
  },
  buttonText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
  buttonText1:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
})

