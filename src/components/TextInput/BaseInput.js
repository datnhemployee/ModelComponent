import React from 'react';
import {View, Animated, ViewPropTypes, Text, Easing} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Constants.js
 */

const animationDuration = 100;

/**
 * @see https://github.com/halilb/react-native-textinput-effects/blob/master/lib/Sae.js
 */

const propTypes = {
  // styles
  style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  // descendant props
  /**
   * The `label` of TextInput (or the `placeholder`)
   */
  label: PropTypes.string,
  /**
   * The `value` of TextInput (change when user type in)
   */
  value: PropTypes.string,
  /**
   * Check if user is able to change the `value` of TextInput
   */
  editable: PropTypes.bool,

  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,

  // animation props
  easing: PropTypes.func,
  animationDuration: PropTypes.number,
  useNativeDriver: PropTypes.bool,
};

const defaultProps = {
  label: '',
  value: '',
  editable: true,

  easing: Easing.linear,
  animationDuration: animationDuration,
  useNativeDriver: false,
};

export default class BaseInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      width: null,
      value: null,
      isFocus: false,
    };
    this.state.animationText = new Animated.Value(this.state.value ? 1 : 0.1);
    this.state.animationView = new Animated.Value(this.state.value ? 1 : 0.1);
    this.state.animationTextColor = new Animated.Value(
      this.state.isFocus ? 1 : 0.1,
    );
  }

  get value() {
    return this.state.value;
  }

  set value(val) {
    this.setState({value: val});
  }

  onChange = (event) => {
    const {
      props: {onChange},
    } = this;
    this.setState(
      {
        value: event.nativeEvent.text,
      },
      () => {
        if (onChange) {
          onChange(event);
        }
      },
    );
  };

  onBlur = (event) => {
    const {
      props: {onBlur},
      state: {value},
      animateTextColor,
    } = this;
    this.setState({isFocus: false}, () => {
      animateTextColor();
      if (!value) {
        this.toggle(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    });
  };

  onFocus = (event) => {
    const {
      props: {onFocus},
      state: {value},
      animateTextColor,
    } = this;
    this.setState({isFocus: true}, () => {
      animateTextColor();
      if (!value) {
        this.toggle(true);
      }
      if (onFocus) {
        onFocus(event);
      }
    });
  };

  onSubmitEditing = (event) => {
    console.log('onSubmitEditing');
    const {
      props: {onSubmitEditing},
      onBlur,
    } = this;
    onBlur(event);

    if (onSubmitEditing) {
      onSubmitEditing(event);
    }
  };

  animateTextColor = () => {
    const {
      props: {animationDuration, easing, useNativeDriver},
      state: {animationTextColor, isFocus},
    } = this;
    console.log('animateTextColor', isFocus);
    Animated.timing(animationTextColor, {
      toValue: isFocus ? 1 : 0,
      duration: animationDuration,
      easing,
      useNativeDriver,
    }).start();
  };

  toggle = (isActive) => {
    const {
      props: {animationDuration, easing, useNativeDriver},
      state: {animationText, animationView},
    } = this;
    this.isActive = isActive;
    Animated.parallel([
      Animated.timing(animationText, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        easing,
        useNativeDriver,
      }),
      Animated.timing(animationView, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        easing,
        useNativeDriver,
      }),
    ]).start();
  };

  focus = () => {
    const {
      props: {editable},
    } = this;
    if (editable && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  onLayout = (event) => {
    this.setState({
      width: event.nativeEvent.layout.width,
    });
  };

  isFocus = () => {
    // const {inputRef} = this;
    const {
      state: {isFocus},
    } = this;
    // if (inputRef.current) {
    //   return inputRef.current.isFocused();
    // }
    // return false;
    return isFocus;
  };

  clear = () => {
    const {inputRef} = this;
    if (inputRef.current) {
      inputRef.current.clear();
      return true;
    }
    return false;
  };
}

BaseInput.propTypes = propTypes;
BaseInput.defaultProps = defaultProps;
