import React, {useCallback, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {Title, IconButton, Colors} from 'react-native-paper';

// Navigators
import {HomeScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';

//Styles
import GS from '../../styles';
import S, {styles} from './home-screen.styled';

import {useStore} from '../../store';
import {Dimensions, FlatList, View} from 'react-native';
import moment from 'moment';
import Icon from '../../components/icon/icon.component';
import theme from '../../styles/theme';

const HomeScreen: React.FC<HomeScreenProps> = observer(({navigation}) => {
  const goToSubscriptions = useCallback(() => {
    navigation.navigate('Subscriptions');
  }, [navigation]);

  const goToEdit = useCallback(
    (idx: number) => {
      navigation.navigate('Edit', {id: idx});
    },
    [navigation],
  );
  const store = useStore();

  const listRef = useRef<FlatList>(null);
  const listOffset = useRef<number | null>(null);
  const handleScroll = (e: any) => {
    listOffset.current = e.nativeEvent.contentOffset.y;
  };

  const handleContentSizeChange = (_: any, h: number) => {
    const {height} = Dimensions.get('window');
    if (h - ((listOffset.current || 0) + height) < 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({animated: true});
      });
    }
  };
  const keyExtractor = useCallback((item) => `${item.id}`, []);
  const renderItem = useCallback(
    ({item, index}) => (
      <S.View
        style={{backgroundColor: item.color}}
        onPress={() => goToEdit(index)}>
        {item.favorite && (
          <Icon
            name={'star'}
            size={20}
            color={theme.colors.brandWhite}
            style={{marginRight: 10}}
          />
        )}
        <S.ViewTitle>{item.title}</S.ViewTitle>
        <Title style={styles.title}>
          Платёж{' '}
          {moment(item.date).fromNow() === 'несколько секунд назад'
            ? 'сегодня'
            : moment(item.date).fromNow()}
        </Title>
        <Title style={styles.titleSum}>
          {item.sum}$ {item.frequency ? `- ${item.frequency}` : ''}
        </Title>
      </S.View>
    ),
    [goToEdit],
  );

  return (
    <GS.SafeAreaView style={{backgroundColor: store.common.fonColor}}>
      <S.Container>
        {store.app.mySubscriptions?.length ? (
          <S.FlatList
            ref={listRef}
            onScroll={handleScroll}
            onContentSizeChange={handleContentSizeChange}
            data={store.app.mySubscriptions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View style={{alignItems: 'center', bottom: 100}}>
            <S.Img
              source={require('../../assets/subscription-manager-0big.png')}
            />
            <Title style={styles.spaceY}>Здесь пока пусто</Title>
            <S.Heading>
              Добавьте первую подписку с помощью кнопки внизу
            </S.Heading>
          </View>
        )}
        <IconButton
          icon="plus"
          color={Colors.white}
          size={45}
          style={styles.addBtn}
          onPress={goToSubscriptions}
        />
      </S.Container>
    </GS.SafeAreaView>
  );
});

export default HomeScreen;
