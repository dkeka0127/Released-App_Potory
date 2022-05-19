import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function DropDown({data, getDropDownItem}: any) {
  const items = [];

  for (let i = 0; i < data.length; i++) {
    items.push({label: data[i], value: data[i]});
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(items[0].value);

  // useEffect(() => {
  //   value !== null && getDropDownItem(value);
  // }, [value]);

  return (
    <DropDownPicker
      placeholder="Select an item"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={() => getDropDownItem(value)}
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

const styles = StyleSheet.create({
  container: {
    width: 125,
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
    borderWidth: 0,
  },
  addBottomLine: {
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
});

// import React, {useState} from 'react';
// import {StyleSheet} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {getStatusBarHeight} from 'react-native-status-bar-height';

// // Page
// import {store} from '../../../../dummyData';

// function MainHome() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState('전체');
//   const [dropdownItems, setDropdownItems] = useState([
//     '전체',
//     '인생네컷',
//     '하루필름',
//     '포토이즘',
//     '포토시그니처',
//   ]);

//   console.log(value);

//   return (
//     <>
//       <DropDownPicker
//         disabled={false}
//         onChangeValue={value => console.log(value)}
//         onSelectItem={item => console.log(item)}
//         style={[styles.context, {height: 47}]}
//         textStyle={styles.text}
//         containerStyle={styles.container}
//         dropDownContainerStyle={styles.context}
//         showTickIcon={false}
//         open={open}
//         value={value}
//         setOpen={setOpen}
//         setValue={setValue}
//         // setItems={setItems}
//         // placeholder={store[0].label}
//         items={dropdownItems}
//         // dropDownMaxHeight={50}
//       />
//     </>
//   );
// }

// export default MainHome;

// const styles = StyleSheet.create({
//   container: {
//     width: 140,
//     height: 45,
//     position: 'absolute',
//     top: getStatusBarHeight() + 15,
//     left: 15,
//     shadowColor: 'rgb(50, 50, 50)',
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     shadowOffset: {height: 0, width: 0},
//     elevation: 5,
//   },
//   context: {
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//   },
//   text: {
//     color: '#111',
//     fontSize: 14,
//   },
// });
