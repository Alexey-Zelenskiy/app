// @ts-ignore
import styled from 'styled-components/native';
import SafeAreaViewLib from 'react-native-safe-area-view';
import {Text} from 'react-native-paper';

import theme from './theme';

// Base layouts
export const ScreenContent = styled.ScrollView`
  padding: 10px 35px;
  background-color: #f1f1f1;
  flex: 1;
`;

export const SafeAreaView = styled(SafeAreaViewLib)`
  flex: 1;
  background-color: white;
`;

export const PrimaryHeaderBlock = styled.View`
  padding: 20px 10px 0 10px;
  justify-content: space-between;
  flex-direction: row;
`;

// Inputs
export const PrimaryInput = styled.Text`
  padding: 21px 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.brandDark};
`;

// Links
const Link = styled(Text)`
  color: ${theme.colors.brandLink};
`;

// Sign Up + Sign In screen
const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 50px 0 20px 0;
`;

const Logo = styled.Image`
  height: 40px;
  resize-mode: contain;
`;

const TermsAndConditions = styled(Text)`
  margin-top: 20px;
`;

export default {
  ScreenContent,
  SafeAreaView,
  PrimaryHeaderBlock,
  Link,
  BottomContainer,
  LogoContainer,
  Logo,
  TermsAndConditions,
};
