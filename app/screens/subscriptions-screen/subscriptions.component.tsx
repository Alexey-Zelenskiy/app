import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';

import GS from '../../styles';
import S from './subscriptions.styled';
import {Dimensions, FlatList} from 'react-native';
import {useStore} from '../../store';

import {SubscriptionsScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';
import Icon from '../../components/icon/icon.component';
import theme from '../../styles/theme';
import {Colors, IconButton} from 'react-native-paper';

const SubscriptionsComponent: React.FC<SubscriptionsScreenProps> = ({
  navigation,
}) => {
  const newSubscription = useCallback(
    (idx: number) => {
      navigation.navigate('NewSubscription', {id: idx});
    },
    [navigation],
  );

  const createSubscription = useCallback(() => {
    navigation.navigate('NewSubscription');
  }, [navigation]);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Icon
            name="search"
            size={20}
            color={theme.colors.brandWhite}
            style={{marginRight: 10}}
            onPress={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <S.SearchInput
              onChangeText={(text: React.SetStateAction<string>) =>
                setValue(text)
              }
              value={value}
              placeholder={'Введите название'}
            />
          )}
        </>
      ),
    });
  }, [navigation, value, showSearch]);

  const listRef = useRef<FlatList>(null);
  const listOffset = useRef<number | null>(null);

  const store = useStore();

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

  const keyExtractor = useCallback((item) => item.title, []);
  const renderItem = useCallback(
    ({item, index}) => (
      <S.View
        style={{backgroundColor: item.color}}
        onPress={() => newSubscription(index)}>
        <S.ViewTitle>{item.title}</S.ViewTitle>
      </S.View>
    ),
    [],
  );

  const subscriptionsSearch = () => {
    return store.app.subscriptions.filter((item: {title: string}) => {
      return (
        item.title.toLowerCase().indexOf(value as string) > -1 ||
        item.title.indexOf(value as string) > -1
      );
    });
  };

  return (
    <GS.SafeAreaView>
      <S.Container>
        <S.FlatList
          ref={listRef}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          data={subscriptionsSearch()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
        <IconButton
          icon="calendar-plus"
          color={Colors.white}
          size={45}
          style={{
            position: 'absolute',
            bottom: 50,
            backgroundColor: '#04bb65',
            marginLeft: '80%',
          }}
          onPress={createSubscription}
        />
      </S.Container>
    </GS.SafeAreaView>
  );
};

export default SubscriptionsComponent;
