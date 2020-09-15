import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
// import Modal from './src/components/modal_error';
import Modal from './src/components/modal';
import {PADDING, MODAL_WIDTH} from './src/utils/Constants';

const mockData = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picking: null,
    };
  }

  onPick = (index) => {
    console.log('pick', index);
    this.setState({picking: index});
  };

  showModal = () => {
    this.modal.show();
  };

  render() {
    const {
      onPick,
      state: {picking},
    } = this;
    return (
      <View style={{flex: 1, backgroundColor: '#FFFF65'}}>
        <TouchableOpacity style={{flex: 1}} onPress={this.showModal}>
          <Text>show modal</Text>
        </TouchableOpacity>
        <Modal
          ref={(refModal) => (this.modal = refModal)}
          containerStyle={{
            width: MODAL_WIDTH,
            backgroundColor: 'white',
            borderRadius: PADDING,
          }}
          pickingIndex={picking}
          onPick={onPick}
          title="Birth Month"
          data={mockData}
          animationType={Modal.AnimationType.none}
        />
      </View>
    );
  }
}

export default App;
