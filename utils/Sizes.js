import { Dimensions } from "react-native";

let { width, height } = Dimensions.get("screen");
width = width / 1.2;
height = height / 1.2;

const Sizes_ = {
  xl: height * 0.06, 
  big: height * 0.04, 
  normal: height * 0.035, 
  small: height * 0.0231, 
  x_small: height * 0.015, 
  spacing: width * 0.004, 
};
export default Sizes_;
