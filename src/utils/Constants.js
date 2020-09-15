import {Dimensions, StatusBar} from 'react-native';

let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

screenHeight = screenHeight - StatusBar.currentHeight;

const PADDING = 24;
const MODAL_WIDTH = (screenWidth * 2) / 3;

const Fonts = {
  Header1: {
    fontSize: 20,
  },
  Body: {
    fontSize: 14,
  },
};

const TOP = StatusBar.currentHeight;

export {screenHeight, screenWidth, PADDING, MODAL_WIDTH, Fonts, TOP};
