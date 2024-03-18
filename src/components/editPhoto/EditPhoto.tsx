import React from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import { EditPhotoButtonProps } from "../../service/types";
import { Colors } from "../../theme/Colors";

export const EditPhotoButton = ({
  containerStyle,
  btnContainerStyle,
  disableBtn,
  onPress,
  hasError,
  form,
  showAddText,
  userPictureUrl,
  imageUpdateKey,
}: EditPhotoButtonProps) => {
  const styles = editPhotoButtonStyles({ hasError, form });

  return (
    <View style={containerStyle}>
      <View style={styles.container}>
        <TouchableOpacity
          style={btnContainerStyle}
          disabled={disableBtn}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.photoContainer}>
            {userPictureUrl ? (
              <Image
                key={imageUpdateKey || userPictureUrl}
                style={styles.userProfilePhoto}
                source={{
                  uri: `${userPictureUrl}${
                    imageUpdateKey ? "?" + imageUpdateKey : ""
                  }`,
                  cache: "reload",
                }}
              />
            ) : (
              <View style={styles.editTextContainer}>
                {form === "circle" && <Text style={styles.editText}>Edit</Text>}
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.errorWrapper}>
          {hasError && (
            <>
              <Text style={styles.errorText}>
                Adding your photo will help us identify you quickly and ensure a
                personalized and efficient workout.
              </Text>
            </>
          )}
        </View>
      </View>

      {Boolean(showAddText) && (
        <View style={styles.addPhotoTextWrapper}>
          <Text style={styles.requiredAsterisk}>*</Text>
          <Text style={styles.addPhotoText}>Add Photo</Text>
        </View>
      )}
    </View>
  );
};

export const editPhotoButtonStyles = ({ isHebrew, hasError, form }: any) =>
  StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: isHebrew ? "row-reverse" : "row",
    },
    errorText: {
      flex: 1,
      color: Colors.grey_text,

      marginLeft: 5,

      textAlign: "left",
    },
    photoContainer: {
      width: 80,
      height: 80,
      borderRadius: 8,
      borderColor: Colors.dark_grey,
      borderWidth: 0.5,
      alignItems: "center",
      justifyContent: "center",
      ...(hasError && {
        color: Colors.grey_text,
        backgroundColor: Colors.dark_grey,
      }),
      ...(form === "circle" && {
        borderRadius: 50,
        backgroundColor: Colors.fill_grey,
      }),
    },
    errorWrapper: {
      flex: 1,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: isHebrew ? "row-reverse" : "row",
    },
    userProfilePhoto: {
      width: 80,
      height: 80,
      borderRadius: 8,
      resizeMode: "cover",
      ...(form === "circle" && {
        borderRadius: 50,
      }),
    },
    addPhotoText: {
      color: Colors.black_txt,
      marginTop: 8,
      alignSelf: "center",
    },
    addPhotoTextWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,

      marginRight: "auto",
    },
    requiredAsterisk: {
      color: Colors.error_red_bg,
      marginTop: 10,
      marginRight: 2,
    },
    imageStyle: {
      marginLeft: 10,
    },
    editText: {
      color: Colors.fill_blue,
      marginBottom: -10,
      marginTop: 10,
    },
    editTextContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
