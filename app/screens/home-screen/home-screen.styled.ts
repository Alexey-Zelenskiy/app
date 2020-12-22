// @ts-ignore
import styled from 'styled-components/native';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
const Container = styled.View`
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`;

const Img = styled.Image`
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
`;

const Heading = styled(Text)`
  text-align: center;
`;

export const styles = StyleSheet.create({
  spaceY: {
    marginBottom: 15,
  },
  addBtn: {
    backgroundColor: '#04bb65',
    marginTop: '80%',
    marginLeft: 'auto',
  },
});

export default {
  Container,
  Img,
  Heading,
};
