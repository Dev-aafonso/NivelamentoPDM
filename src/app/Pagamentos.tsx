import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";

type AnimMap = {
  [key: string]: Animated.Value;
};

export default function Pagamentos() {
  const [selected, setSelected] = useState<string>("Cartão");
  const animations = useRef<AnimMap>({}).current;

  const router = useRouter();

  const { plano, preco } = useLocalSearchParams<{
    plano?: string;
    preco?: string;
  }>();

  const pagamentos = [
    {
      nome: "Cartão de crédito",
      key: "Cartão",
      descricao: "Parcelado em até 6x vezes sem juros.",
      icon: require("../assets/Visa.png"),
      extra: require("../assets/Nubank.png"),
    },
    {
      nome: "PIX",
      key: "Pix",
      descricao: "Pagamento instantâneo via agência.",
      icon: require("../assets/Pix.png"),
    },
    {
      nome: "Pix parcelado",
      key: "PixParcelado",
      descricao: "Pagamento instantâneo via agência, parcelado",
      icon: require("../assets/Pix-Parcelado.png"),
    },
    {
      nome: "Boleto",
      key: "Boleto",
      descricao: "Forma de boleto, para imprimir e pagar.",
      icon: require("../assets/Boleto.png"),
    },
  ];

  function getAnim(nome: string) {
    if (!animations[nome]) {
      animations[nome] = new Animated.Value(nome === selected ? 1 : 0);
    }
    return animations[nome];
  }

  function selecionar(nome: string) {
    if (nome === selected) return;

    setSelected(nome);

    Object.keys(animations).forEach((key) => {
      Animated.timing(animations[key], {
        toValue: key === nome ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }

  function escolherPagamento() {
    router.replace("/inicialScreen");
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />

          <Text style={styles.title}>Forma de pagamento</Text>

          <View style={styles.resumo}>
            <Text style={styles.resumoText}>
              {plano ?? "Plano"} • {preco ?? ""}
            </Text>
          </View>

          <View style={styles.lista}>
            {pagamentos.map((item) => {
              const anim = getAnim(item.key);
              const isActive = selected === item.key;

              const scale = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.02],
              });

              const bgColor = anim.interpolate({
                inputRange: [0, 1],
                outputRange: ["#f2f2f2", "#f7d64363"],
              });

              return (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.9}
                  onPress={() => selecionar(item.key)}
                >
                  <Animated.View
                    style={[
                      styles.item,
                      {
                        transform: [{ scale }],
                        backgroundColor: bgColor,
                        borderColor: isActive ? "#3d120a" : "#702516",
                      },
                    ]}
                  >
                    <View
                      style={[styles.radio, isActive && styles.radioActive]}
                    />

                    <View style={styles.info}>
                      <Text style={styles.nome}>{item.nome}</Text>
                      <Text style={styles.descricao}>{item.descricao}</Text>
                    </View>

                    <View style={styles.icons}>
                      {item.extra && (
                        <Image source={item.extra} style={styles.iconSmall} />
                      )}
                      <Image source={item.icon} style={styles.icon} />
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.botao} onPress={escolherPagamento}>
            <Text style={styles.botaoTexto}>Continuar</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>VERATES.IA</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },

  card: {
    width: "92%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#702516",
    marginBottom: 10,
    fontFamily: "Averia Serif Libre",
  },

  // 🔥 NOVO ESTILO
  resumo: {
    backgroundColor: "#f7d64330",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 14,
  },

  resumoText: {
    color: "#702516",
    fontWeight: "600",
    fontSize: 13,
  },

  lista: {
    width: "100%",
    gap: 12,
  },

  item: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1.5,
    alignItems: "center",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#702516",
    marginRight: 12,
  },

  radioActive: {
    backgroundColor: "#702516",
    borderColor: "#f2c200",
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },

  descricao: {
    fontSize: 12,
    color: "#333",
  },

  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },

  iconSmall: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },

  botao: {
    backgroundColor: "#702516",
    borderRadius: 10,
    paddingVertical: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: "#3d120a",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footer: {
    marginTop: 15,
    fontSize: 16,
    color: "#702516",
    fontFamily: "Averia Serif Libre",
    fontWeight: "bold",
  },
});
