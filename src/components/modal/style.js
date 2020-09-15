import {
  screenHeight,
  screenWidth,
  Fonts,
  PADDING,
  TOP,
} from '../../utils/Constants';

const viewCenter = {
  position: 'absolute',
  width: screenWidth,
  height: screenHeight,
  top: 0,
  left: 0,
};

const viewBackground = {
  backgroundColor: 'black',
  flex: 1,
  opacity: 0.5,
};

const viewModal = {
  position: 'absolute',
  width: screenWidth,
  height: screenHeight,
  top: TOP,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: PADDING,
};

const textTitle = {
  marginTop: PADDING,
  marginBottom: PADDING,
  ...Fonts.Header1,
  textAlign: 'center',
  textAlignVertical: 'center',
};

const viewItem = {
  height: Fonts.Body.fontSize + PADDING,
  justifyContent: 'center',
};

const textItem = {
  ...Fonts.Body,
  marginLeft: PADDING,
};

export default {
  viewCenter,
  viewBackground,
  viewModal,
  textTitle,
  viewItem,
  textItem,
};
