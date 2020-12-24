// @ts-ignore
import styled from 'styled-components/native';
import {Text, Title} from 'react-native-paper';
import {FlatList as FlatListLib, StyleSheet, Dimensions} from 'react-native';
import theme from "../../styles/theme";

const Container = styled.View`
  justify-content: center;
  width: 100%;
  padding-top: 20px;
  flex: 1;
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
  titleSum: {
    right: '5%',
    top: 5,
    color: theme.colors.brandWhite,
    position: 'absolute',
    fontSize: 16,
  },
  addBtn: {
    position: 'absolute',
    backgroundColor: '#04bb65',
    bottom: 25,
    left: '80%',
  },
  title: {
    color: theme.colors.brandWhite,
  },
});
const ViewTitle = styled(Title)`
  color: white;
  font-style: italic;
`;

// Just and ugly hack to type FlatList
const FlatList = styled(FlatListLib as new () => FlatListLib)`
  padding: 0 15px 0 15px;
`;
const View = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  padding: 15px;
  margin-bottom: 25px;
  justify-content: center;
  border-radius: 15px;
`;
export default {
  ViewTitle,
  View,
  FlatList,
  Container,
  Img,
  Heading,
};
