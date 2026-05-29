import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Dimensions,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function ResultadoAnalise() {
  const router = useRouter();

  const { score } = useLocalSearchParams();

  const porcentagem = Number(score) || 92;

  const getResultData = () => {
    if (porcentagem >= 80) {
      return {
        titulo: "ALTA CONFIABILIDADE",
        descricao:
          "Nossa IA não encontrou indícios significativos de desinformação. O conteúdo é corroborado em diversas fontes confiáveis.",
        cor: "#2F8F2F",
        icon: require("../assets/shield-check.png"),
      };
    }

    if (porcentagem >= 50) {
      return {
        titulo: "CONFIABILIDADE MODERADA",
        descricao:
          "Nossa IA encontrou alguns indícios de inconsistência. O conteúdo possui confirmação parcial em fontes confiáveis.",
        cor: "#C46A00",
        icon: require("../assets/Shield.png"),
      };
    }

    return {
      titulo: "BAIXA CONFIABILIDADE",
      descricao:
        "Nossa IA encontrou fortes indícios de desinformação. O conteúdo não é corroborado em diversas fontes confiáveis.",
      cor: "#A00000",
      icon: require("../assets/X.png"),
    };
  };

  const result = getResultData();

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* BACK */}
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>

          {/* CARD */}
          <View style={styles.card}>
            {/* TITLE */}
            <Text style={styles.title}>Analise Concluída</Text>

            <Text style={styles.subtitle}>
              Verificamos esta informação em múltiplas fontes confiáveis.
            </Text>

            {/* RESULT */}
            <View style={styles.resultCard}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    borderColor: result.cor,
                    backgroundColor: `${result.cor}20`,
                  },
                ]}
              >
                <Image
                  source={result.icon}
                  style={[styles.resultIcon, { tintColor: result.cor }]}
                />
              </View>

              <Text style={[styles.resultTitle, { color: result.cor }]}>
                {result.titulo}
              </Text>

              <Text style={styles.resultDescription}>{result.descricao}</Text>
            </View>

            {/* SCORE */}
            <View style={styles.scoreArea}>
              <View style={styles.scoreHeader}>
                <Text style={styles.confidenceText}>Nível de confiança</Text>

                <Text style={[styles.scorePercentage, { color: result.cor }]}>
                  {porcentagem}%
                </Text>
              </View>

              <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${porcentagem}%`,
                        backgroundColor: result.cor,
                      },
                    ]}
                  >
                    <View style={styles.progressGlow} />
                  </View>
                </View>
              </View>
            </View>

            {/* SOURCES */}
            <View style={styles.sourcesCard}>
              <Text style={styles.sourcesTitle}>Fontes Consultadas</Text>

              <View style={styles.sourcesRow}>
                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />

                <Text style={styles.arrow}>➜</Text>

                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />

                <Text style={styles.arrow}>➜</Text>

                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver detalhes da análise</Text>

              <Text style={styles.buttonArrow}>➜</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const isSmallDevice = height < 700;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
    alignItems: "center",
  },

  backButtonContainer: {
    width: 55,
    height: 55,

    borderRadius: 999,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,

    alignSelf: "flex-start",

    marginBottom: 18,
  },

  backButton: {
    fontSize: 28,
    color: "#702516",
    fontWeight: "bold",
  },
  backText: {
    fontSize: 34,
    color: "#2B1A17",
    fontWeight: "600",
    marginTop: -4,
  },

  card: {
    width: "100%",
    maxWidth: 480,

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    paddingHorizontal: 20,
    paddingVertical: 24,

    borderWidth: 2,
    borderColor: "#702516ab",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 8,
  },

  title: {
    fontSize: width < 380 ? 28 : 32,
    textAlign: "center",

    color: "#702516",

    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  subtitle: {
    marginTop: 14,

    textAlign: "center",

    color: "#555",

    fontSize: width < 380 ? 13 : 15,

    lineHeight: 24,
  },

  resultCard: {
    width: "100%",

    marginTop: 28,

    backgroundColor: "#F5F5F5",

    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#702516ab",
    paddingVertical: 26,
    paddingHorizontal: 20,

    alignItems: "center",
  },

  iconCircle: {
    width: isSmallDevice ? 84 : 96,
    height: isSmallDevice ? 84 : 96,

    borderRadius: 999,

    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  resultIcon: {
    width: isSmallDevice ? 38 : 46,
    height: isSmallDevice ? 38 : 46,

    resizeMode: "contain",
  },

  resultTitle: {
    fontSize: width < 380 ? 18 : 20,
    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 10,
  },

  resultDescription: {
    fontSize: width < 380 ? 14 : 16,

    color: "#444",

    textAlign: "center",

    lineHeight: 24,
  },

  /* SCORE */
  scoreArea: {
    marginTop: 28,
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  confidenceText: {
    fontSize: width < 380 ? 14 : 16,

    color: "#444",

    fontWeight: "600",
  },

  scorePercentage: {
    fontSize: width < 380 ? 18 : 20,

    fontWeight: "bold",
  },

  progressWrapper: {
    width: "100%",
  },

  progressBackground: {
    width: "100%",

    height: 16,

    backgroundColor: "#E0E0E0",

    borderRadius: 999,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#D2D2D2",
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,

    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 3,
  },

  progressGlow: {
    position: "absolute",

    right: 0,
    top: 0,
    bottom: 0,

    width: 18,

    backgroundColor: "rgba(255,255,255,0.35)",

    borderRadius: 999,
  },

  sourcesCard: {
    width: "100%",

    marginTop: 28,

    backgroundColor: "#F5F5F5",

    borderRadius: 22,

    borderWidth: 1.5,
    borderColor: "#702516ab",

    padding: 20,
  },

  sourcesTitle: {
    fontSize: width < 380 ? 15 : 17,

    fontWeight: "bold",

    color: "#444",

    marginBottom: 22,
  },

  sourcesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  sourceIcon: {
    width: width < 380 ? 34 : 40,
    height: width < 380 ? 34 : 40,

    resizeMode: "contain",
  },

  arrow: {
    fontSize: width < 380 ? 22 : 28,
    marginHorizontal: 10,
    color: "#222",
  },

  button: {
    width: "100%",

    marginTop: 30,

    backgroundColor: "#8B3A2E",

    borderRadius: 999,

    paddingVertical: 18,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",

    fontSize: width < 380 ? 16 : 18,

    fontWeight: "600",

    marginRight: 8,
  },

  buttonArrow: {
    color: "#FFF",
    fontSize: 22,
  },
});
