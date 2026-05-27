import { useRouter } from "expo-router";
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const verificacoes = [
  {
    id: "1",
    titulo: "Governo anuncia novo programa social",
    status: "Verdadeiro",
    data: "27/05/2026 - 08:30",
  },
  {
    id: "2",
    titulo: "Novo medicamento cura todas as doenças",
    status: "Parcialmente Verdadeiro",
    data: "26/05/2026 - 14:12",
  },
  {
    id: "3",
    titulo: "Vídeo viral sobre tecnologia alienígena",
    status: "Falso",
    data: "25/05/2026 - 19:45",
  },
];

export default function Verificacoes() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verdadeiro":
        return "#28A745";
      case "Parcialmente Verdadeiro":
        return "#FFC107";
      case "Falso":
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Verificações</Text>

        <View style={{ width: 30 }} />
      </View>

      <FlatList
        data={verificacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.status}>{item.status}</Text>

              <Text style={styles.title}>{item.titulo}</Text>

              <Text style={styles.date}>{item.data}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  backButton: {
    fontSize: 30,
    color: "#702516",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#702516",
    fontFamily: "Averia Serif Libre",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",

    borderWidth: 1,
    borderColor: "#70251620",

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 12,
  },

  status: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },

  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },

  date: {
    color: "#888",
    fontSize: 13,
  },
});
