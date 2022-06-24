import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Modal from 'react-native-modal';

export interface AlertDataType {
  title?: string;
  message: string;
  etcMessage?: string | JSX.Element;
}

interface ButtonsType {
  btnType: 'confirm' | 'cancel';
  title: string;
  onPress: () => void;
}
export interface AlertProps extends AlertDataType {
  isVisible?: boolean;
  buttons?: ButtonsType[];
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function Alert({
  title,
  message,
  etcMessage,
  buttons,
  onConfirm,
  onCancel,
}: AlertProps) {
  return (
    <Modal
      isVisible={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}>
      <View style={style.modalWrap}>
        <View style={style.contentArea}>
          {title && (
            <View style={style.titleArea}>
              <Text style={style.titleText}>{title}</Text>
            </View>
          )}
          <View style={style.messageArea}>
            <Text style={style.messageText}>{message}</Text>
          </View>
          {etcMessage && (
            <View style={style.etcMessageArea}>
              {React.isValidElement(etcMessage) ? (
                etcMessage
              ) : (
                <Text style={style.etcMessageText}>{etcMessage}</Text>
              )}
            </View>
          )}
        </View>
        <View style={style.btnFooterArea}>
          {buttons ? (
            <>
              {buttons.map((item, index) => (
                <TouchableOpacity
                  key={`alert-buttons-${index}`}
                  onPress={item.onPress}
                  style={[
                    item.btnType === 'confirm'
                      ? style.btnConfirm
                      : style.btnCancel,
                    index > 0 && {marginLeft: 16},
                  ]}>
                  <Text style={style.btnConfirmText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              {onCancel && (
                <TouchableOpacity
                  onPress={onCancel}
                  style={[{marginRight: 16}, style.btnCancel]}>
                  <Text style={style.btnCancelText}>취소</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onConfirm} style={style.btnConfirm}>
                <Text style={style.btnConfirmText}>확인</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modalWrap: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 16,
  },
  contentArea: {
    justifyContent: 'center',
    minHeight: 100,
    marginTop: 12,
    marginBottom: 24,
  },
  titleArea: {},
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.96,
    textAlign: 'center',
    color: '#212121',
  },
  messageArea: {
    marginTop: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.84,
    textAlign: 'center',
    color: '#212121',
  },
  etcMessageArea: {
    marginTop: 12,
  },
  etcMessageText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.96,
    textAlign: 'center',
    color: '#8b8b8b',
  },
  btnFooterArea: {
    flexDirection: 'row',
  },
  btnCancel: {
    flex: 1,
    height: 52,
    backgroundColor: '#efefef',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancelText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.96,
    textAlign: 'center',
    color: '#888888',
  },
  btnConfirm: {
    flex: 1,
    height: 52,
    backgroundColor: '#ffd565',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnConfirmText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.96,
    textAlign: 'center',
    color: '#212121',
  },
});
