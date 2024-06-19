import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TAGS } from "../../service/types";
import { Colors } from "../../theme/Colors";

export type FilterProps = {
  onSelectTag: (param: string | null) => void;
};
const FilterChips = ({ onSelectTag }: FilterProps) => {
  const handleSelected = (tag: string) => {
    onSelectTag(tag === "All" ? null : tag);
    setSelected(tag);
  };
  const [selected, setSelected] = useState<string>("All");

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {TAGS.map((tag, index) => {
          return (
            <Pressable
              key={tag}
              onPress={() => handleSelected(tag)}
              style={({ pressed }) => [
                styles.tag,
                // {
                //   backgroundColor: Boolean(pressed || selected === tag)
                //     ? "#545264"
                //     : Colors.main_white,
                // },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  {
                    color: Boolean(selected === tag)
                      ? Colors.yellow
                      : "#545264",
                  },
                ]}
              >
                {tag}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20,
    backgroundColor: Colors.main_white,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tag: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    borderRadius: 4,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tagText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilterChips;
