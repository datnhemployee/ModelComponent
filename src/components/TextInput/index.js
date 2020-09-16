import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
} from 'react-native';
import style from './style';
import BaseInput from './BaseInput';
import PropTypes from 'prop-types';

/**
 * Constants.js
 */
const BottomLineWidth = 1;
const ColorBlur = '#a3a3a3';
const ColorFocus = '#2ecc71';

/**
 * TextInput.js
 * @see https://github.com/halilb/react-native-textinput-effects/blob/master/lib/Sae.js
 */

const propTypes = {
  /**
   * height of the container component
   *
   * *Note: does not need to set `width` because
   * `width` will be get by onLayout
   */
  height: PropTypes.number,

  inputPadding: PropTypes.number,
  labelHeight: PropTypes.number,

  labelAnimatedFontSize: PropTypes.number,

  colorFocus: PropTypes.string,
  colorBlur: PropTypes.string,
};

const defaultProps = {
  ...BaseInput.defaultProps,
  colorFocus: ColorFocus,
  ColorBlur: ColorBlur,
};

export default class CustomInput extends BaseInput {
  constructor(props) {
    super(props);
    /**
     * *Note: Change with responsive UI
     */
    this.autorPadding = 8;
  }

  render() {
    const {
      props: {
        // size
        height: inputHeight,
        inputPadding,
        labelAnimatedFontSize,
        // label
        label,
        // styles
        styleContainer,
        styleLabel,
        styleTextInput,
        colorFocus,
        colorBlur,
      },
      state: {value, width, animationText, animationView, animationTextColor},
      // private handlers

      onLayout,
      onChange,
      onFocus,
      onBlur,
      onSubmitEditing,

      // refs
    } = this;

    const isFocus = this.isFocus();
    const textInputFontSize = inputHeight;
    const labelDefaultFontSize = textInputFontSize;

    console.log('isFocus', isFocus);
    return (
      <View
        style={[
          style.viewContainer,
          styleContainer,
          {
            height:
              inputHeight +
              inputPadding * 2 +
              labelAnimatedFontSize +
              this.autorPadding,
            borderBottomColor: isFocus ? colorFocus : colorBlur,
            borderBottomWidth: BottomLineWidth,
            paddingBottom: 0,
          },
        ]}
        onLayout={onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: animationView.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  inputHeight + inputPadding + this.autorPadding,
                ],
              }),
            }}>
            <Animated.Text
              style={[
                style.textLabel,
                styleLabel,
                {
                  color: animationTextColor.interpolate({
                    inputRange: [0, 1],
                    // outputRange: ['#696969',  '#a3a3a3'],
                    outputRange: [ColorBlur, ColorFocus],
                  }),
                  fontSize: animationText.interpolate({
                    inputRange: [0, 1],
                    outputRange: [labelDefaultFontSize, labelAnimatedFontSize],
                  }),
                },
              ]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          style={[
            style.textInput,
            styleTextInput,
            {
              marginTop: inputPadding * 2 + this.autorPadding,
              width,
              height: inputHeight + inputPadding + labelAnimatedFontSize,
              paddingTop: 0,
              paddingBottom: 0,
              fontSize: textInputFontSize,
            },
          ]}
          ref={this.inputRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          onFocus={onFocus}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

CustomInput.propTypes = propTypes;
CustomInput.defaultProps = defaultProps;
