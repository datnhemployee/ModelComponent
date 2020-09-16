import React, {Component} from 'react';
import {
  Modal,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import style from './style';

// Constants.js

let {width: screenWidth, height: screenHeight} = Dimensions.get('window');

screenHeight = screenHeight - StatusBar.currentHeight;

const PADDING = 24;

const font = {
  Header: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  Body: {
    fontSize: 14,
  },
};

const _itemHeight = font.Header.fontSize + PADDING;

// Modal.js
export default class CustomModal extends Component {
  static AnimationType = {
    slide: 'slide',
    fade: 'fade',
    none: 'none',
  };
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  hanldBackButtonOnClick = () => {
    console.log('backbuttonOnClick');
    this.hide();
  };

  hide = () => {
    this.setState({visible: false});
  };

  show = () => {
    this.setState({visible: true});
  };

  onChange = ({value, index}) => {
    const {
      props: {onChange},
    } = this;
    onChange({value, index});
    this.hide();
  };

  Title = (props) => {
    const {value} = props;
    return (
      <Text
        style={{
          textAlign: 'center',
          ...font.Header,
        }}>
        {value}
      </Text>
    );
  };

  Item = ({item: {value}, index}) => {
    const {
      props: {pickedIndex, itemHeight = _itemHeight},
    } = this;
    return (
      <TouchableWithoutFeedback onPress={() => this.onChange({value, index})}>
        <Text
          style={[
            {
              height: itemHeight,
              ...font.Body,
              textAlignVertical: 'center',
              paddingLeft: PADDING,
            },
            {
              backgroundColor:
                index === pickedIndex ? '#00000099' : 'transparent',
            },
          ]}>
          {value}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      props: {title, data, animationType, containerStyle},
      Title,
      Item,
    } = this;
    console.log('visible', this.state.visible);
    return (
      <Modal
        visible={this.state.visible}
        animationType={animationType}
        onRequestClose={this.hide}
        transparent>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View
              style={{
                backgroundColor: 'black',
                opacity: 0.7,
                position: 'absolute',
                top: 0,
                left: 0,
                height: screenHeight,
                width: screenWidth,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              width: (screenWidth * 2) / 3,
              height: screenHeight,
              backgroundColor: 'white',
              borderRadius: PADDING,
              paddingTop: PADDING,
              paddingBottom: PADDING,
            }}>
            <Title value={title} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={Item}
              keyExtractor={(item, idx) => item.key}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
