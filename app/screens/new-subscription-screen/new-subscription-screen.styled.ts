// @ts-ignore
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: 15px;
  justify-content: flex-start;
  align-items: center;
`;

const SubscriptionView = styled.View`
  width: 85%;
  height: 90px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  flex-direction: row;
`;

export const styles = StyleSheet.create({
  titleSum: {
    right: '5%',
    top: 5,
    color: theme.colors.brandWhite,
    position: 'absolute',
  },
  dateInput: {
    width: '85%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'slategray',
    borderStyle: 'solid',
    marginBottom: 20,
    justifyContent: 'center',
  },
});

const Input = styled.TextInput`
  width: 85%;
  height: 50px;
  border-bottom-width: 1px;
  border-color: slategray;
  border-style: solid;
  margin-bottom: 20px;
`;

export default {
  Container,
  SubscriptionView,
  Input,
};