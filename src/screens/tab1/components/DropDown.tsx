import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function DropDown({data, getDropDownItem}: any) {
  const items: any = [];
  for (let i = 0; i < data.length; i++) {
    items.push({label: data[i], value: data[i]});
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('전체');

  useEffect(() => {
    getDropDownItem(value);
  }, [value]);

  return (
    <DropDownPicker
      placeholder="Select an item"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      maxHeight={160}
      // autoScroll={true}
      // stickyHeader={true}
      showArrowIcon={false}
      showTickIcon={false}
      textStyle={styles.text}
      // labelStyle={styles.labelText}
      containerStyle={styles.container}
      placeholderStyle={styles.placeHoldText}
      // selectedItemLabelStyle={styles.selectedItem}
      style={[styles.deleteBorderWidth, open && styles.addBottomLine]}
      dropDownContainerStyle={styles.deleteBorderWidth}
      zIndex={1000}
    />
  );
}

export default DropDown;

const PositionTop = 70;
const PositionLeft = 15;
const borderRadius = 15;

const styles = StyleSheet.create({
  container: {
    width: 130,
    position: 'absolute',
    top: PositionTop,
    left: PositionLeft,

    // 그림자
    elevation: 3,
    shadowOpacity: 0.3,
    shadowColor: '#888',
    shadowOffset: {width: 0, height: 0},
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  placeHoldText: {
    color: 'grey',
    fontWeight: 'bold',
  },
  labelText: {
    // fontWeight: 'bold',
  },
  selectedItem: {
    // fontWeight: 'bold',
  },
  deleteBorderWidth: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: borderRadius,
  },
  addBottomLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: borderRadius,
  },
});
