import React, {Component} from 'react';
import {
  Modal,
  FlatList,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import style from './style';

export default class View extends Component {
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
    return <Text>{value}</Text>;
  };

  Item = ({item}) => {
    return <Text>{item}</Text>;
  };

  render() {
    const {
      props: {title, data, animationType, containerStyle},
      Title,
      Item,
    } = this;
    console.log('visible', this.state.visible);
    return (
      <Modal visible={this.state.visible} animationType={animationType}>
        <Title value={title} />
        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={(item, idx) => JSON.stringify(item) + idx}
        />
        <TouchableOpacity onPress={this.hanldBackButtonOnClick}>
          <Text>Hide</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}
