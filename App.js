import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
// import Modal from './src/components/modal_error';
import Modal from './src/components/modal';
import {PADDING, MODAL_WIDTH} from './src/utils/Constants';

const uniqueId = {
  value: 0,
  next: function() {
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
    this.state = {
      picking: null,
    };
  }

  onPick = index => {
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
          ref={refModal => (this.modal = refModal)}
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
