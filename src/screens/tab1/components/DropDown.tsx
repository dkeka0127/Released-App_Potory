import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Page
import {store} from '../../../../dummyData';

function MainHome() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('전체');
  const [dropdownItems, setDropdownItems] = useState(store);

  console.log(value);

  return (
    <>
      <DropDownPicker
        disabled={false}
        onChangeValue={value => console.log(value)}
        onSelectItem={item => console.log(item)}
        style={[styles.context, {height: 47}]}
        textStyle={styles.text}
        containerStyle={styles.container}
        dropDownContainerStyle={styles.context}
        showTickIcon={false}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        // setItems={setItems}
        placeholder={store[0].label}
        items={dropdownItems}
        // dropDownMaxHeight={50}
      />
    </>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 45,
    position: 'absolute',
    top: getStatusBarHeight() + 15,
    left: 15,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {height: 0, width: 0},
    elevation: 5,
  },
  context: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  text: {
    color: '#111',
    fontSize: 14,
  },
});
