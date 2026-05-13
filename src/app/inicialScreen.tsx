import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useRef } from "react";

const { width } = Dimensions.get("window");

export default function Verificar() {
  const router = useRouter();

  const sidebarAnim = useRef(new Animated.Value(-280)).current;

  const openSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -280,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/Background.png")}
        style={styles.background}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openSidebar}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => router.push("/planos" as any)}
          >
            <Image
              source={require("../assets/Plus.png")}
              style={styles.plusIcon}
            />
            <Text style={styles.plusText}>Plus</Text>
          </TouchableOpacity>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.container}>
          <Text style={styles.title}>Como deseja verificar?</Text>

          <Text style={styles.subtitle}>
            Escolha o tipo de conteúdo para analisarmos a veracidade.
          </Text>

          {/* BOTÕES SEPARADOS */}
          <TouchableOpacity style={styles.optionCard} activeOpacity={0.85}>
            <Image
              source={require("../assets/paperclip.png")}
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardTitle}>Analisar link</Text>
              <Text style={styles.cardSubtitle}>
                Cole o link de uma notícia{"\n"}ou página
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} activeOpacity={0.85}>
            <Image
              source={require("../assets/textT.png")}
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardTitle}>Inserir texto</Text>
              <Text style={styles.cardSubtitle}>Cole ou digite o conteúdo</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionCard} activeOpacity={0.85}>
            <Image
              source={require("../assets/image.png")}
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardTitle}>Analisar imagem</Text>
              <Text style={styles.cardSubtitle}>Envie ou cole uma imagem</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footerCard}>
          <Image
            source={require("../assets/shield-check.png")}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>
            Nossa IA verifica múltiplas fontes confiáveis no mundo todo
          </Text>
        </View>
      </ImageBackground>

      {/* SIDEBAR MELHORADA */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <TouchableOpacity onPress={closeSidebar}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.sidebarTitle}>Menu</Text>

        <TouchableOpacity style={styles.sidebarCard}>
          <Text style={styles.sidebarIcon}>📜</Text>
          <Text style={styles.sidebarText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarCard}>
          <Text style={styles.sidebarIcon}>✔</Text>
          <Text style={styles.sidebarText}>Informações verificadas</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuIcon: {
    fontSize: 30,
    color: "#702516",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#702516",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  plusIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: "#702516",
  },

  plusText: {
    color: "#702516",
    fontWeight: "bold",
  },

  container: {
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    color: "#702516",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    borderWidth: 1.5,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },

  icon: {
    width: 38,
    height: 38,
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#702516",
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#444",
  },

  footerCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    marginBottom: 25,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.5,
    borderColor: "#702516",
  },

  footerIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: "#702516",
  },

  footerText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    maxWidth: 260,
  },

  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.75, // mais larga
    backgroundColor: "#fff",
    padding: 25,

    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },

  close: {
    fontSize: 24,
    alignSelf: "flex-end",
  },

  sidebarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 25,
    color: "#702516",
  },

  sidebarCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#ddd",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  sidebarIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  sidebarText: {
    fontSize: 16,
    color: "#333",
  },
});
