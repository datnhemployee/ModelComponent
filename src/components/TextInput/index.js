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
const BottomLineColorBlur = 'grey';
const BottomLineColorFocus = 'green';

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
  textInputFontSize: PropTypes.number,
};

const defaultProps = {
  ...BaseInput.defaultProps,
};

export default class CustomInput extends BaseInput {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props: {
        // size
        height: inputHeight,
        inputPadding,
        labelAnimatedFontSize,
        textInputFontSize,
        // label
        label,
        // styles
        styleContainer,
        styleLabel,
        styleTextInput,
      },
      state: {value, width, animation},
      // private handlers

      onLayout,
      onChange,
      onFocus,
      onBlur,

      // refs
    } = this;

    const isFocus = this.isFocus();
    const labelDefaultFontSize = textInputFontSize;

    return (
      <View
        style={[
          style.viewContainer,
          styleContainer,
          {
            height: inputHeight + inputPadding * 2 + labelAnimatedFontSize,
            borderBottomColor: isFocus
              ? BottomLineColorFocus
              : BottomLineColorBlur,
            borderBottomWidth: BottomLineWidth,
            paddingBottom: 0,
          },
        ]}
        onLayout={onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, inputHeight + inputPadding],
              }),
            }}>
            <Animated.Text
              style={[
                style.textLabel,
                styleLabel,
                {
                  fontSize: animation.interpolate({
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
              marginTop: inputPadding,
              width,
              height: inputHeight + inputPadding + labelAnimatedFontSize,
              // paddingTop: inputPadding * 2,
              paddingTop: 0,
              paddingBottom: 0,
              fontSize: textInputFontSize,
              // borderWidth: 1,
            },
          ]}
          ref={this.inputRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

CustomInput.propTypes = propTypes;
CustomInput.defaultProps = defaultProps;
