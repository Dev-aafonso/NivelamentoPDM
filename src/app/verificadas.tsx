import { useRouter } from "expo-router";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const verificacoes = [
  {
    id: "1",
    titulo: "Governo anuncia novo programa social",
    status: "Alta confiabilidade",
    data: "27/05/2026 - 08:30",
  },
  {
    id: "2",
    titulo: "Novo medicamento cura todas as doenças",
    status: "Confiabilidade moderada",
    data: "26/05/2026 - 14:12",
  },
  {
    id: "3",
    titulo: "Vídeo viral sobre tecnologia alienígena",
    status: "Baixa confiabilidade",
    data: "25/05/2026 - 19:45",
  },
];

export default function Verificacoes() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alta confiabilidade":
        return "#28A745";

      case "Confiabilidade moderada":
        return "#FFC107";

      case "Baixa confiabilidade":
        return "#DC3545";

      default:
        return "#777";
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButtonContainer}
              onPress={() => router.back()}
            >
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Verificações</Text>

            <View style={{ width: 55 }} />
          </View>

          {/* CARD PRINCIPAL */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Notícias verificadas recentemente
            </Text>

            <FlatList
              data={verificacoes}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.9} style={styles.newsCard}>
                  {/* STATUS */}
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: getStatusColor(item.status),
                      },
                    ]}
                  />

                  {/* TEXTO */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.status,
                        {
                          color: getStatusColor(item.status),
                        },
                      ]}
                    >
                      {item.status}
                    </Text>

                    <Text style={styles.title}>{item.titulo}</Text>

                    <Text style={styles.date}>{item.data}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  /* HEADER */

  header: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 22,
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
  },

  backButton: {
    fontSize: 28,
    color: "#702516",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#702516",
    fontFamily: "Averia Serif Libre",
    letterSpacing: 1,
  },

  /* CARD PRINCIPAL */

  card: {
    width: "95%",
    maxWidth: 480,

    flex: 1,

    backgroundColor: "#ffffff",

    borderRadius: 24,

    paddingVertical: 28,
    paddingHorizontal: 20,

    elevation: 8,

    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#702516",
    marginBottom: 22,
    fontFamily: "Averia Serif Libre",
    textAlign: "center",
  },

  listContent: {
    paddingBottom: 20,
  },

  /* CARD DAS NOTÍCIAS */

  newsCard: {
    width: "100%",

    backgroundColor: "#F8F8F8",

    borderRadius: 18,

    padding: 18,

    marginBottom: 16,

    flexDirection: "row",

    borderWidth: 1.2,
    borderColor: "#70251650",
  },

  statusDot: {
    width: 14,
    height: 14,

    borderRadius: 7,

    marginTop: 5,
    marginRight: 14,
  },

  status: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 10,
  },

  date: {
    color: "#888",
    fontSize: 13,
  },
});
