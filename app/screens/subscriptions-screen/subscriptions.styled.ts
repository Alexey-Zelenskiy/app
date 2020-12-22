import {FlatList as FlatListLib} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {Title} from 'react-native-paper';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const View = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  margin-bottom: 25px;
  justify-content: center;
  border-radius: 15px;
`;

const SearchInput = styled.TextInput`
  width: 200px;
  position: absolute;
  right: 38px;
  height: 40px;
  background-color: white;
`;


const ViewTitle = styled(Title)`
  color: white;
  font-style: italic;
  margin-left: 20px;
`;

// Just and ugly hack to type FlatList
const FlatList = styled(FlatListLib as new () => FlatListLib)`
  padding: 10px;
  margin-bottom: 10px;
`;

export default {
  Container,
  FlatList,
  View,
  ViewTitle,
  SearchInput,
};
