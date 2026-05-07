import SocialButton from "../app/componentes";

import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  function handleCadastro() {
    if (!email.includes("@")) {
      Alert.alert("Erro", "Digite um e-mail válido");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    Alert.alert("Sucesso", "Cadastro realizado!");
  }

  const isDisabled = !username || !email || !senha || !confirmSenha;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require("../assets/Background.png")}
          style={styles.background}
        >
          <View style={styles.card}>
            <Image source={require("../assets/Logo.png")} style={styles.logo} />

            <Text style={styles.title}>VERATES.IA</Text>

            <View style={styles.forms}>
              {/* USERNAME */}
              <Text style={styles.label}>Nome de Usuário</Text>
              <TextInput
                placeholder="Digite seu nome de usuário"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />

              {/* EMAIL */}
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                placeholder="Digite seu e-mail"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              {/* SENHA */}
              <Text style={styles.label}>Senha</Text>
              <TextInput
                placeholder="Digite sua senha"
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />

              {/* CONFIRMAR SENHA */}
              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                placeholder="Confirme sua senha"
                secureTextEntry
                style={styles.input}
                value={confirmSenha}
                onChangeText={setConfirmSenha}
              />

              <TouchableOpacity
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={handleCadastro}
                disabled={isDisabled}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
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
                  text="Google"
                  onPress={() => Alert.alert("Google")}
                />
                <SocialButton
                  source={require("../assets/Apple.png")}
                  text="Apple"
                  onPress={() => Alert.alert("Apple")}
                />
                <SocialButton
                  source={require("../assets/Facebook.png")}
                  text="Facebook"
                  onPress={() => Alert.alert("Facebook")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
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
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 15,
    elevation: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#702516",
    letterSpacing: 2,
    marginBottom: 15,
    fontFamily: "Averia Serif Libre",
  },

  forms: {
    width: "100%",
    gap: 10,
  },

  label: {
    width: "90%",
    alignSelf: "center",
    fontSize: 14,
    color: "#702516",
    marginBottom: 2,
  },

  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1.5,
    borderColor: "#702516e4",
    fontSize: 16,
    letterSpacing: 0.5,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#702516",
    borderRadius: 8,
    paddingVertical: 14,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
    alignSelf: "center",
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
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
});
