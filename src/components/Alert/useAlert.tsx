import React, {useCallback} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {usePortal} from '@gorhom/portal';
import {Alert, AlertProps} from './Alert';

interface useAlertType {
  addAlert: ({
    title,
    message,
    etcMessage,
    buttons,
    onConfirm,
    onCancel,
  }: AlertProps) => void;
  removeAlert: () => void;
}

function useAlert(name: string = 'alert'): useAlertType {
  const {addPortal, removePortal} = usePortal();

  const addAlert = useCallback(
    ({
      title,
      message,
      etcMessage,
      buttons,
      onConfirm,
      onCancel,
    }: AlertProps) => {
      // addPopup Event
      DeviceEventEmitter.emit('addPopup', name);
      addPortal(
        name,
        <Alert
          key={name}
          title={title}
          message={message}
          etcMessage={etcMessage}
          isVisible
          buttons={buttons}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />,
      );
    },
    [name, addPortal],
  );

  const removeAlert = useCallback(() => {
    // removePopupEvent
    DeviceEventEmitter.emit('removePopup', name);
    removePortal(name);
  }, [name, removePortal]);

  return {
    addAlert,
    removeAlert,
  };
}

export default useAlert;
