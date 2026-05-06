import SocialButton from "../app/componentes";

import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  function ChamarAlerta() {
    Alert.alert("Login", "Login realizado com sucesso!");
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <View style={styles.card}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />

        <Text style={styles.title}>VERATES.IA</Text>

        <View style={styles.forms}>
          <TextInput placeholder="Nome de Usuário" style={styles.input} />

          <TextInput placeholder="E-mail" style={styles.input} />

          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            style={styles.input}
          />

          <TextInput
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={ChamarAlerta}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Já possui uma conta? Faça seu login.
          </Text>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>OU</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <SocialButton
              source={require("../assets/Google.png")}
              onPress={() => Alert.alert("Google")}
            />

            <SocialButton
              source={require("../assets/Apple.png")}
              onPress={() => Alert.alert("Apple")}
            />

            <SocialButton
              source={require("../assets/Facebook.png")}
              onPress={() => Alert.alert("Facebook")}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "90%",
    height: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    alignItems: "center",
  },

  logo: {
    width: "28%",
    height: "18%",
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#702516",
    opacity: 0.9,
    letterSpacing: 4,
    marginBottom: 10,
    fontFamily: "Averia Serif Libre",
  },

  forms: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: "#702516e4",
    fontSize: 20,
    letterSpacing: 2,
    marginVertical: 4,
    fontFamily: "Times New Roman",
  },

  button: {
    backgroundColor: "#702516",
    padding: 12,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  loginText: {
    padding: 10,
    marginTop: 10,
    color: "#702516",
    fontSize: 14,
    textAlign: "center",
  },

  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  separatorText: {
    marginHorizontal: 10,
    color: "#888",
    fontWeight: "bold",
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },

  socialButton: {
    width: "90%",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },

  socialText: {
    fontSize: 14,
    color: "#333",
  },
});
