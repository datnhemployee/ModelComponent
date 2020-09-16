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
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
/**
 * Constants.js
 */
const BottomLineWidth = 1;
const ColorBlur = '#a3a3a3';
const ColorFocus = '#2ecc71';
const WarningColor = '#e74c3c';

/**
 * Incase `inputPadding` is equal to `zero`
 */
const smallPadding = 8;

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
  /**
   * @summary
   * {null|false|true}
   * `null`: The textInput does not show anything
   * `false`: The textInput show the eye
   * `true`: The textInput show the eye-off
   */
  secureTextEntry: null,
};

export default class CustomInput extends BaseInput {
  constructor(props) {
    super(props);
    this.state.warning = false;
  }

  /**
   * @param status {true|false}
   *
   * @summary
   * use when want to show warning status of text input
   *
   * `Note`: we can not change the status back to normal state again.
   * please see the app.
   */
  warn = (status) => {
    this.setState({
      warning: status,
    });
  };

  onPressEyeIcon = () => {
    const {
      props: {onPressEyeIcon, secureTextEntry},
    } = this;
    if (onPressEyeIcon && typeof secureTextEntry === 'boolean') {
      onPressEyeIcon();
    }
  };

  /**
   * Use for the padding between the label and the value of `TextInput`
   */
  get autoPadding() {
    const {
      props: {height},
    } = this;
    return height + smallPadding;
  }

  /**
   * The height of all elements in `TextInput`
   */
  get containerHeight() {
    const {
      props: {height, inputPadding, labelAnimatedFontSize},
      autoPadding,
    } = this;

    return height + inputPadding * 2 + labelAnimatedFontSize + autoPadding;
  }

  renderIcon = () => {
    const {
      state: {warning},
      props: {height, secureTextEntry},
    } = this;
    const iconSize = height * 2;
    if (typeof secureTextEntry === 'boolean' && !secureTextEntry) {
      return <Ionicons name="eye" size={iconSize} color={ColorBlur} />;
    }
    if (typeof secureTextEntry === 'boolean' && secureTextEntry) {
      return <Ionicons name="eye-off" size={iconSize} color={ColorBlur} />;
    }
    if (warning) {
      return <Entypo name="warning" size={iconSize} color={WarningColor} />;
    }
    return null;
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
        secureTextEntry,
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
      onPressEyeIcon,
      containerHeight,
    } = this;

    const isFocus = this.isFocus();
    const textInputFontSize = inputHeight;
    const labelDefaultFontSize = textInputFontSize;
    console.log('containerHeight', containerHeight);

    const autoPadding = inputHeight;
    return (
      <View
        style={[
          style.viewContainer,
          styleContainer,
          {
            height: containerHeight,
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
                ? inputHeight + autoPadding
                : animationView.interpolate({
                    inputRange: [0, 1],
                    outputRange: [smallPadding, inputHeight + autoPadding],
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
          secureTextEntry={secureTextEntry}
        />
        <TouchableWithoutFeedback onPress={onPressEyeIcon}>
          <View
            style={{
              position: 'absolute',
              top: inputPadding * 2 + autoPadding,
              left: width - inputHeight - autoPadding,
            }}>
            {renderIcon()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

CustomInput.propTypes = propTypes;
CustomInput.defaultProps = defaultProps;
