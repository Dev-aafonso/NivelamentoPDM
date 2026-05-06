import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
};

export default function SocialButton({ source, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={source} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
