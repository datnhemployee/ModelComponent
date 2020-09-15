import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import style from './style';
import {PADDING, MODAL_WIDTH} from '../../utils/Constants';

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
    } = this;
    onPick(index);
    this.hide();
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
          <Text style={style.textItem}>{item}</Text>
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
    return visible ? (
      <TouchableWithoutFeedback
        visible={this.state.visible}
        animationType={animationType}>
        <View style={style.viewCenter}>
          <View style={style.viewBackground} />
          <View style={style.viewModal}>
            <View
              style={[
                containerStyle,
                {
                  paddingBottom: PADDING,
                },
              ]}>
              <Title value={title} />
              <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item, idx) => JSON.stringify(item) + idx}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : null;
  }
}
