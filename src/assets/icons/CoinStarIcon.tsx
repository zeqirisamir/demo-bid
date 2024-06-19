import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "../../service/types";

const CoinStarIcon = (props: SvgProps) => (
  <Svg
    width={props?.width || 20}
    height={props?.height || 20}
    viewBox={`0 0 20 20`}
    fill={props?.fill || "none"}
    {...props}
  >
    <Path
      d="M9.665 19.163a9.498 9.498 0 100-18.997 9.498 9.498 0 000 18.998z"
      fill="#FEDA2C"
    />
    <Path
      d="M9.665 16.987a7.322 7.322 0 100-14.644 7.322 7.322 0 000 14.644z"
      fill="#FCAA17"
    />
    <Path
      d="M9.664 4.038l1.665 3.374 3.724.541-2.694 2.626.636 3.709-3.33-1.751-3.331 1.75.636-3.708-2.695-2.626L8 7.412l1.665-3.374z"
      fill="#FEDA2C"
    />
  </Svg>
);

export default CoinStarIcon;
