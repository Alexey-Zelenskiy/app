import React, {ReactNode} from 'react';
import {Platform} from 'react-native';

// Styles
import S from './scroll-keyboard-layout.styled';
import GS from '../../styles';

interface ScrollKeyboardLayoutProps {
  children: ReactNode;
}

const ScrollKeyboardLayout: React.FC<ScrollKeyboardLayoutProps> = ({
  children,
}) => {
  return (
    <GS.SafeAreaView>
      <S.Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <GS.ScreenContent>{children}</GS.ScreenContent>
      </S.Container>
    </GS.SafeAreaView>
  );
};

export default ScrollKeyboardLayout;
