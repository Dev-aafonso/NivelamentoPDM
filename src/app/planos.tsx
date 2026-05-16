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

import { useRef, useState } from "react";

import { useRouter } from "expo-router";

type AnimMap = {
  [key: string]: Animated.Value;
};

export default function Planos() {
  const [selected, setSelected] = useState("Plus");
  const animations = useRef<AnimMap>({}).current;
  const router = useRouter();

  const planos = [
    {
      nome: "Grátis",
      preco: "R$ 0,00",
      descricao: "Com anúncios e dez usos diários limitados.",
    },
    {
      nome: "Plus",
      preco: "R$ 10,00",
      descricao: "Sem anúncios, cinquenta usos diários.",
    },
    {
      nome: "Pro",
      preco: "R$ 50,00",
      descricao: "Sem anúncios, cem usos diários.",
    },
    {
      nome: "Ultra Pro Plus",
      preco: "R$ 80,00",
      descricao: "Sem anúncios, cento e cinquenta usos diários.",
    },
  ];

  function getAnim(nome: string) {
    if (!animations[nome]) {
      animations[nome] = new Animated.Value(nome === selected ? 1 : 0);
    }
    return animations[nome];
  }

  function selecionarPlano(nome: string) {
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

  function escolherPlano() {
    const planoSelecionado = planos.find((p) => p.nome === selected);

    if (selected === "Grátis") {
      router.push("/inicialScreen" as any);
    } else {
      router.push({
        pathname: "/Pagamentos",
        params: {
          plano: selected,
          preco: planoSelecionado?.preco,
        },
      });
    }
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />

          <Text style={styles.title}>Escolha seu plano</Text>

          <View style={styles.planosContainer}>
            {planos.map((plano) => {
              const anim = getAnim(plano.nome);
              const isActive = selected === plano.nome;

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
                  key={plano.nome}
                  activeOpacity={0.9}
                  onPress={() => selecionarPlano(plano.nome)}
                >
                  <Animated.View
                    style={[
                      styles.cardPlano,
                      {
                        transform: [{ scale }],
                        backgroundColor: bgColor,
                        borderColor: isActive ? "#3d120a" : "#702516",
                      },
                    ]}
                  >
                    {/* BADGE leve */}
                    {plano.nome === "Plus" && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>POPULAR</Text>
                      </View>
                    )}

                    <View
                      style={[styles.radio, isActive && styles.radioActive]}
                    />

                    <View style={styles.info}>
                      <Text style={styles.nome}>{plano.nome}</Text>
                      <Text style={styles.preco}>{plano.preco}</Text>
                      <Text style={styles.descricao}>{plano.descricao}</Text>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.botao} onPress={escolherPlano}>
            <Text style={styles.botaoTexto}>Escolher {selected}</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>VERATES.IA</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

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
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#702516",
    marginBottom: 18,
    fontFamily: "Averia Serif Libre",
  },

  planosContainer: {
    width: "100%",
    gap: 12,
  },

  cardPlano: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1.5,
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: -8,
    right: 8,
    backgroundColor: "#702516",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },

  badgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
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

  preco: {
    fontSize: 15,
    color: "#702516",
    fontWeight: "600",
  },

  descricao: {
    fontSize: 12,
    color: "#333",
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
