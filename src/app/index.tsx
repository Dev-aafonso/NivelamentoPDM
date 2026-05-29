import SocialButton from "./componentes/socialButton";

import {
  Alert,
  Dimensions,
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

import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(false);

  function handleLogin() {
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Digite um e-mail válido");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "Senha inválida (mínimo 6 caracteres)");
      return;
    }

    Alert.alert("Sucesso", "Login realizado!", [
      {
        text: "OK",
        onPress: () => router.replace("/inicialScreen" as any),
      },
    ]);
  }

  const isDisabled = !email || !senha;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(w, h) => {
          setScrollEnabled(h > Dimensions.get("window").height);
        }}
      >
        <ImageBackground
          source={require("../assets/Background.png")}
          style={styles.background}
        >
          <View style={styles.card}>
            <Image source={require("../assets/Logo.png")} style={styles.logo} />

            <Text style={styles.title}>VERATES.IA</Text>

            <View style={styles.forms}>
              {/* EMAIL */}
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                placeholder="Digite seu e-mail"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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

              {/* BOTÃO LOGIN */}
              <TouchableOpacity
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isDisabled}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              {/* CADASTRO */}
              <TouchableOpacity onPress={() => router.push("/cadastro")}>
                <Text style={styles.loginText}>
                  Não possui conta? Cadastre-se
                </Text>
              </TouchableOpacity>

              {/* SEPARADOR */}
              <View style={styles.separatorContainer}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>OU</Text>
                <View style={styles.line} />
              </View>

              {/* SOCIAL */}
              <View style={styles.socialContainer}>
                <SocialButton
                  source={require("../assets/Google.png")}
                  text="Google"
                  onPress={() => Alert.alert("Login com Google")}
                />
                <SocialButton
                  source={require("../assets/Apple.png")}
                  text="Apple"
                  onPress={() => Alert.alert("Login com Apple")}
                />
                <SocialButton
                  source={require("../assets/Facebook.png")}
                  text="Facebook"
                  onPress={() => Alert.alert("Login com Facebook")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ⚠️ mantém seus styles (não alterei)

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
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#702516",
    letterSpacing: 2,
    marginBottom: 15,
  },

  forms: {
    width: "100%",
  },

  label: {
    width: "90%",
    alignSelf: "center",
    fontSize: 14,
    color: "#702516",
    marginBottom: 4,
    marginTop: 8,
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
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#702516",
    borderRadius: 8,
    paddingVertical: 14,
    width: "90%",
    alignItems: "center",
    marginTop: 15,
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
    marginVertical: 15,
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
    flexWrap: "wrap",
    marginTop: 10,
  },
});
