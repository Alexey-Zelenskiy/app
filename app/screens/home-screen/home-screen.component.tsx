import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Title, IconButton, Colors} from 'react-native-paper';
//Components

// Navigators
import {HomeScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';

// Store
// import {useStore} from '~/store';

//Styles
import GS from '../../styles';
import S, {styles} from './home-screen.styled';

const DashboardScreen: React.FC<HomeScreenProps> = observer(({navigation}) => {
  const goToSubscriptions = useCallback(() => {
    navigation.navigate('Subscriptions');
  }, []);

  // const store = useStore();

  return (
    <GS.SafeAreaView>
      <GS.ScreenContent>
        <S.Container>
          <S.Img
            source={require('../../assets/subscription-manager-0big.png')}
          />
          <Title style={styles.spaceY}>Здесь пока пусто</Title>
          <S.Heading>Добавьте первую подписку с помощью кнопки внизу</S.Heading>
          <IconButton
            icon="plus"
            color={Colors.white}
            size={45}
            style={styles.addBtn}
            onPress={goToSubscriptions}
          />
        </S.Container>
      </GS.ScreenContent>
    </GS.SafeAreaView>
  );
});

export default DashboardScreen;
