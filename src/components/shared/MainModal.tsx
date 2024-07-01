import React, { useContext, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "../header/Icon";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../theme/Colors";
import LottieView from "lottie-react-native";

interface MainModalProps {
  visible: boolean;
  onClose: () => void;
  onPress: () => void;
  id?: number;
  title?: string;
  subtitle?: string;
  iconName?: string;
  yesText?: string;
  cancelText?: string;
}

const MainModal = ({
  visible,
  onClose,
  onPress,
  id,
  subtitle,
  title,
  iconName,
  yesText,
  cancelText,
}: MainModalProps) => {
  const animation = useRef(null);
  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AntDesign name="close" size={25} color="#666" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{title}</Text>

            <Text style={styles.modalText}>{subtitle}</Text>

            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.actionButton}
            >
              <Text style={styles.DeletebuttonText}>
                {yesText ?? "Complete Bidding"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelbuttonText}>
                {cancelText ?? "Cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MainModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContent: {
    backgroundColor: Colors.white_grey,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 999,
    height: 320,
    marginHorizontal: 15,
    width: "90%",
    shadowColor: Colors.black_txt,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.84,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    padding: 20,
    right: 10,
  },
  actionButton: {
    backgroundColor: Colors.yellow,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    borderRadius: 200,
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    borderRadius: 32,
    marginVertical: 10,
    borderColor: Colors.yellow,
    borderWidth: 1,
  },
  modalTitle: {
    margin: 5,
    marginTop: 40,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  DeletebuttonText: {
    backgroundColor: Colors.yellow,
    color: "white",
    justifyContent: "center",
    // padding: 5,
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "400",
  },

  cancelbuttonText: {
    backgroundColor: "white",
    justifyContent: "center",
    // padding: 5,
    alignSelf: "center",
    color: Colors.yellow,
    fontSize: 14,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 14,
  },
});
