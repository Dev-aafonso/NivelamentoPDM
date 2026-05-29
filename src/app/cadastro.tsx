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

export default function Cadastro() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [scrollEnabled, setScrollEnabled] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    senha: "",
    confirmSenha: "",
  });

  function handleCadastro() {
    let newErrors = {
      username: "",
      email: "",
      senha: "",
      confirmSenha: "",
    };

    if (!username.trim()) newErrors.username = "Nome obrigatório";
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "E-mail inválido";
    if (senha.length < 6) newErrors.senha = "Mínimo de 6 caracteres";
    if (senha !== confirmSenha)
      newErrors.confirmSenha = "As senhas não coincidem";

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    Alert.alert("Sucesso", "Cadastro realizado!");
    router.push("/planos");
  }

  const hasErrors = Object.values(errors).some((e) => e);
  const isDisabled =
    !username || !email || !senha || !confirmSenha || hasErrors;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
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
              <Text style={styles.label}>Nome de Usuário</Text>
              <TextInput
                placeholder="Digite seu nome"
                style={[styles.input, errors.username && styles.inputError]}
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  setErrors({ ...errors, username: "" });
                }}
              />
              {!!errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                placeholder="Digite seu e-mail"
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setErrors({ ...errors, email: "" });
                }}
              />
              {!!errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Senha</Text>
              <TextInput
                placeholder="Digite sua senha"
                secureTextEntry
                style={[styles.input, errors.senha && styles.inputError]}
                value={senha}
                onChangeText={(t) => {
                  setSenha(t);
                  setErrors({ ...errors, senha: "" });
                }}
              />
              {!!errors.senha && (
                <Text style={styles.errorText}>{errors.senha}</Text>
              )}

              <Text style={styles.label}>Confirmar Senha</Text>
              <TextInput
                placeholder="Confirme sua senha"
                secureTextEntry
                style={[styles.input, errors.confirmSenha && styles.inputError]}
                value={confirmSenha}
                onChangeText={(t) => {
                  setConfirmSenha(t);
                  setErrors({ ...errors, confirmSenha: "" });
                }}
              />
              {!!errors.confirmSenha && (
                <Text style={styles.errorText}>{errors.confirmSenha}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={handleCadastro}
                disabled={isDisabled}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.loginText}>
                  Já possui uma conta? Faça seu login.
                </Text>
              </TouchableOpacity>

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

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    fontSize: 12,
    width: "90%",
    alignSelf: "center",
    marginTop: -5,
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#702516",
    borderRadius: 8,
    paddingVertical: 14,
    width: "90%",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",

    borderWidth: 1.5,
    borderColor: "#702516e4",
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
    paddingHorizontal: 10,
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
    gap: 10,
    marginTop: 10,
  },
});
