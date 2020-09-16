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
import Icon from 'react-native-vector-icons/Entypo';
/**
 * Constants.js
 */
const BottomLineWidth = 1;
const ColorBlur = '#a3a3a3';
const ColorFocus = '#2ecc71';
const WarningColor = '#e74c3c';

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

  renderIcon: PropTypes.func,
  isShownIcon: PropTypes.bool,
};

const defaultProps = {
  ...BaseInput.defaultProps,
  colorFocus: ColorFocus,
  ColorBlur: ColorBlur,

  renderIcon: () => null,
  isShownIcon: false,
};

export default class CustomInput extends BaseInput {
  constructor(props) {
    super(props);
    this.state.warning = false;
  }

  warn = status => {
    this.setState({
      warning: status,
    });
  };

  get autoPadding() {
    const {
      props: {height},
    } = this;
    return height;
  }

  get containerHeight() {
    const {
      props: {height, inputPadding, labelAnimatedFontSize},
      autoPadding,
    } = this;
    console.log(
      'containerHeight',
      height,
      inputPadding * 2,
      labelAnimatedFontSize,
      autoPadding,
    );
    return height + inputPadding * 2 + labelAnimatedFontSize + autoPadding;
  }

  renderIcon = () => {
    const {
      state: {warning},
      props: {height},
    } = this;
    const iconSize = height;
    return warning ? (
      <Icon name="warning" size={iconSize} color={WarningColor} />
    ) : null;
  };

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
      state: {
        value,
        width,
        animationText,
        animationView,
        animationTextColor,
        warning,
      },
      // private handlers

      onLayout,
      onChange,
      onFocus,
      onBlur,
      onSubmitEditing,

      renderIcon,
    } = this;

    const isFocus = this.isFocus();
    const textInputFontSize = inputHeight;
    const labelDefaultFontSize = textInputFontSize;

    console.log('isFocus', isFocus);
    const autoPadding = inputHeight;
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
              autoPadding,
            borderBottomColor: warning
              ? WarningColor
              : isFocus
              ? colorFocus
              : colorBlur,
            borderBottomWidth: BottomLineWidth,
            paddingBottom: 0,
          },
        ]}
        onLayout={onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: warning
                ? inputHeight + inputPadding + autoPadding
                : animationView.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, inputHeight + inputPadding + autoPadding],
                  }),
            }}>
            <Animated.Text
              style={[
                style.textLabel,
                styleLabel,
                {
                  color: warning
                    ? WarningColor
                    : animationTextColor.interpolate({
                        inputRange: [0, 1],
                        // outputRange: ['#696969',  '#a3a3a3'],
                        outputRange: [ColorBlur, ColorFocus],
                      }),
                  fontSize: warning
                    ? labelAnimatedFontSize
                    : animationText.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          labelDefaultFontSize,
                          labelAnimatedFontSize,
                        ],
                      }),
                },
              ]}>
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View
          style={{
            position: 'absolute',
            top: inputPadding * 2 + autoPadding,
            left: width - inputHeight - autoPadding,
          }}>
          {renderIcon()}
        </View>
        <TextInput
          style={[
            style.textInput,
            styleTextInput,
            {
              marginTop: inputPadding * 2 + autoPadding,
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
