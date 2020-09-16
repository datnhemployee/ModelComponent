import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
import CustomInput from './src/components/TextInput';

/*
 * Constants.js
 */
const PADDING = 0;
const inputHeight = 14;
const labelAnimatedFontSize = 12;
const screenWidth = Dimensions.get('window').width;
/*
 * App.js
 */

const uniqueId = {
  value: 0,
  next: function () {
    this.value += 1;
    return this.value;
  },
};

const mockData = [
  {value: 'Jan'},
  {value: 'Feb'},
  {value: 'Mar'},
  {value: 'Apr'},
  {value: 'May'},
  {value: 'Jun'},
  {value: 'Jul'},
  {value: 'Aug'},
  {value: 'Sep'},
  {value: 'Oct'},
  {value: 'Nov'},
  {value: 'Dec'},
];

let moreItems = 100;
while (moreItems > 0) {
  mockData.push({value: `${Math.random() * 1000}`});
  moreItems -= 1;
}

for (let item of mockData) {
  item.key = uniqueId.next();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.inputUsernameRef = React.createRef();
    this.inputPasswordRef = React.createRef();

    this.state = {
      secureTextEntry: false,
    };
  }

  showWarning = (status) => {
    if (this.inputUsernameRef.current) {
      this.inputUsernameRef.current.setWarning(status);
      this.inputPasswordRef.current.setWarning(status);
    }
  };

  onPressShowWarning = () => {
    const {showWarning} = this;
    showWarning(true);
  };

  onPressClearWarning = () => {
    const {showWarning} = this;
    showWarning(false);
  };

  onPressEyeIcon = () => {
    const {
      state: {secureTextEntry},
    } = this;
    this.setState({secureTextEntry: !secureTextEntry});
  };

  onSubmitUsername = () => {
    this.inputPasswordRef.current.focus();
  };

  onSubmitPassword = () => {
    this.inputUsernameRef.current.focus();
  };

  render() {
    const {
      renderIcon,
      onPressShowWarning,
      onPressClearWarning,
      onPressEyeIcon,
      state: {isShownIcon, secureTextEntry},
      onSubmitUsername,
      onSubmitPassword,
    } = this;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CustomInput
          ref={this.inputUsernameRef}
          label="Username"
          editable
          height={inputHeight}
          inputPadding={PADDING}
          labelAnimatedFontSize={labelAnimatedFontSize}
          /**
           * DO NOT use {`flex`} for set `styleContainer`
           */
          styleContainer={{
            position: 'absolute',
            top: 100,
            left: PADDING,
            width: screenWidth - PADDING * 2,
          }}
          styleLabel={{}}
          styleTextInput={{}}
          renderIcon={renderIcon}
          isShownIcon={isShownIcon}
          onPressEyeIcon={onPressEyeIcon}
          onSubmitEditing={onSubmitUsername}
        />
        <CustomInput
          ref={this.inputPasswordRef}
          label="Password"
          editable
          height={inputHeight}
          inputPadding={PADDING}
          labelAnimatedFontSize={labelAnimatedFontSize}
          /**
           * DO NOT use {`flex`} for set `styleContainer`
           */
          styleContainer={{
            position: 'absolute',
            top: 100 + inputHeight * 4,
            left: PADDING,
            width: screenWidth - PADDING * 2,
          }}
          styleLabel={{}}
          styleTextInput={{}}
          renderIcon={renderIcon}
          isShownIcon={isShownIcon}
          secureTextEntry={secureTextEntry}
          onPressEyeIcon={onPressEyeIcon}
          onSubmitEditing={onSubmitPassword}
        />
        <TouchableOpacity onPress={onPressShowWarning}>
          <Text>Get Warning</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressClearWarning}>
          <Text>Clear Warning</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;
