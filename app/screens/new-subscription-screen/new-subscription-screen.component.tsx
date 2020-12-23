import React, {useLayoutEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NewSubscriptionScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';
import GS from '../../styles';
import S, {styles} from './new-subscription-screen.styled';
import {useStore} from '../../store';
import {Title} from 'react-native-paper';
import theme from '../../styles/theme';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import Icon from '../../components/icon/icon.component';

const NewSubscriptionComponent: React.FC<NewSubscriptionScreenProps> = ({
  navigation,
  route,
}) => {
  const store = useStore();
  const {id} = route.params ?? {id: undefined};
  const subscriptionData = store.app.subscriptions[id];
  const [color, setColor] = useState<string>('black');

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sum, setSum] = useState<string>('');
  const [date, setDate] = useState<string>('Первый платёж');
  const [showDate, setShowDate] = useState<boolean>(false);
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: subscriptionData.title || 'Добавить подписку',
      headerRight: () => (
        <>
          <Icon
            name="check"
            size={20}
            color={theme.colors.brandWhite}
            style={{marginRight: 10}}
          />
        </>
      ),
    });
  }, [navigation]);

  return (
    <GS.SafeAreaView>
      <ScrollView>
        <S.Container>
          <S.SubscriptionView
            style={{
              backgroundColor: subscriptionData.color || color,
            }}>
            <Title style={{color: theme.colors.brandWhite}}>
              {name || subscriptionData.title}
            </Title>
            <Title style={styles.titleSum}>{sum || 0}$</Title>
          </S.SubscriptionView>
          <S.Input
            value={name || subscriptionData.title}
            placeholder={'Название'}
            onChangeText={(text: React.SetStateAction<string>) => setName(text)}
          />
          <S.Input
            value={description}
            placeholder={'Описание'}
            onChangeText={(text: React.SetStateAction<string>) =>
              setDescription(text)
            }
          />
          <S.Input value={'s'} placeholder={'Введите название'} />
          <S.Input
            value={sum}
            placeholder={'Сумма'}
            keyboardType="numeric"
            onChangeText={(text: React.SetStateAction<string>) => setSum(text)}
          />
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDate(true)}>
            <Text>{date}</Text>
          </TouchableOpacity>
          {/* {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )} */}
          <S.Input value={'s'} placeholder={'Введите название'} />
        </S.Container>
      </ScrollView>
    </GS.SafeAreaView>
  );
};

export default NewSubscriptionComponent;
