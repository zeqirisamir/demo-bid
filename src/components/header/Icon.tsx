import React from "react";
import { ColorValue, ViewStyle } from "react-native";
import Icons, { IconName } from "../../theme/Icons";

function getIconComponentByName(name: IconName = "done") {
  return Icons[name];
}

export interface IconProps {
  name: IconName;
  fill?: ColorValue;
  color?: ColorValue;
  size?: number;
  width?: number;
  height?: number;
  style?: ViewStyle;
  stroke?: string;
}

const Icon = ({ name, size, color, ...props }: IconProps) => {
  const IconComponent = getIconComponentByName(name);
  if (!IconComponent) {
    return null;
  }

  const sizeProps = size ? { width: size, height: size } : {};
  const colorProps = color ? { fill: color } : {};
  return (
    <IconComponent testID="icon" {...colorProps} {...props} {...sizeProps} />
  );
};

export default Icon;
