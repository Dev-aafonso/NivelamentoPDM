import {
    Animated,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRef, useState } from "react";

type AnimMap = {
  [key: string]: Animated.Value;
};

export default function Planos() {
  const [selected, setSelected] = useState("Grátis");

  const animations = useRef<AnimMap>({}).current;

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
      animations[nome] = new Animated.Value(0);
    }
    return animations[nome];
  }

  function selecionarPlano(nome: string) {
    setSelected(nome);

    Object.keys(animations).forEach((key) => {
      Animated.timing(animations[key], {
        toValue: key === nome ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }).start();
    });
  }

  function escolherPlano() {
    alert(`Plano selecionado: ${selected}`);
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />

          <Text style={styles.title}>Escolha seu plano</Text>

          <View style={styles.planosContainer}>
            {planos.map((plano) => {
              const anim = getAnim(plano.nome);
              const isActive = selected === plano.nome;

              const scale = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.04],
              });

              const bgColor = anim.interpolate({
                inputRange: [0, 1],
                outputRange: ["#f2f2f2", "#fff3c4"],
              });

              const borderColor = anim.interpolate({
                inputRange: [0, 2],
                outputRange: ["#702516", "#3d120a"],
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
                        borderColor: borderColor,
                      },
                    ]}
                  >
                    <View style={styles.radioContainer}>
                      <View
                        style={[styles.radio, isActive && styles.radioActive]}
                      />
                    </View>

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
            <Text style={styles.botaoTexto}>Escolher Plano</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>VERATES.IA</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  card: {
    width: "92%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#702516",
    marginBottom: 25,
    fontFamily: "Averia Serif Libre",
  },

  planosContainer: {
    width: "100%",
    gap: 16,
  },

  cardPlano: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1.5,
    alignItems: "center",
  },

  radioContainer: {
    marginRight: 18,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#702516",
  },

  radioActive: {
    backgroundColor: "#702516",
    borderColor: "#f2c200",
  },

  info: {
    flex: 1,
    gap: 3,
  },

  nome: {
    fontSize: 17,
    fontWeight: "bold",
  },

  preco: {
    fontSize: 16,
    color: "#702516",
    fontWeight: "600",
  },

  descricao: {
    fontSize: 13,
    color: "#333",
  },

  botao: {
    backgroundColor: "#702516",
    borderRadius: 10,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
    borderWidth: 1.5,
    borderColor: "#3d120a",
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  footer: {
    marginTop: 18,
    fontSize: 16,
    color: "#702516",
    fontFamily: "Averia Serif Libre",
    fontWeight: "bold",
  },
});
