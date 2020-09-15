import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import style from './style';
import {PADDING, MODAL_WIDTH, screenHeight, TOP} from '../../utils/Constants';

export default class Modal extends Component {
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

  pick = (index) => {
    const {
      props: {onPick = (index) => {}},
      state: {visible},
    } = this;
    if (visible) {
      onPick(index);
      this.hide();
      return;
    }
    this.show();
  };

  hanldBackButtonOnClick = () => {
    console.log('backbuttonOnClick');
    this.hide();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.hanldBackButtonOnClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.hanldBackButtonOnClick,
    );
  }

  hide = () => {
    this.setState({visible: false});
  };

  show = () => {
    this.setState({visible: true}, () => {
      console.log('visible', this.state.visible);
    });
  };

  onPressOutside = () => {
    const {
      state: {visible},
    } = this;
    if (!visible) {
      this.show();
      return;
    }
    this.hide();
  };

  Title = (props) => {
    const {value} = props;
    return <Text style={style.textTitle}>{value}</Text>;
  };

  Item = ({item, index}) => {
    const {
      props: {
        pickingIndex = null,
        containerStyle: {width = MODAL_WIDTH},
      },
    } = this;
    const pickingStyle =
      index === pickingIndex
        ? {
            backgroundColor: 'grey',
          }
        : {backgroundColor: 'transparent'};
    return (
      <TouchableWithoutFeedback onPress={() => this.pick(index)}>
        <View style={[style.viewItem, pickingStyle, {width}]}>
          <Text style={style.textItem}>{item.value}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      props: {title, data, animationType, containerStyle},
      Title,
      Item,
      state: {visible},
    } = this;
    console.log('visible', this.state.visible);
    return (
      <View style={style.viewContainer}>
        <TouchableWithoutFeedback
          animationType={animationType}
          onPress={this.onPressOutside}>
          <View
            style={[
              style.viewCenter,
              {opacity: visible ? style.viewCenter.opacity : 0},
            ]}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            containerStyle,
            {
              paddingBottom: PADDING,
              maxHeight: screenHeight - TOP,
              opacity: visible ? 1 : 0,
            },
          ]}>
          <Title value={title} />
          <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
