// @ts-ignore
import styled from 'styled-components/native';
import {ViewProps} from 'react-native';

import theme from '../../styles/theme';

const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.brandDark};
`;

const TouchableOpacity = styled.TouchableOpacity`
  padding: 10px 5px 5px;
  flex: 1;
  align-items: center;
`;

const IconContainer = styled.View`
  position: relative;
  width: 26px;
  height: 26px;
`;

interface BadgeProps extends ViewProps {
  isExtended: boolean;
}

const Badge = styled.View<BadgeProps>`
  position: absolute;
  top: -4px;
  right: ${(isExtended: any) => (isExtended ? '-19px' : '-12px')};
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.brandDark};
`;

const BadgeText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

export default {
  Container,
  TouchableOpacity,
  IconContainer,
  Badge,
  BadgeText,
};
