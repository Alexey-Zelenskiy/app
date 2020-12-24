import React, {useCallback, useLayoutEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NewSubscriptionScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';
import GS from '../../styles';
import S, {styles} from './new-subscription-screen.styled';
import {useStore} from '../../store';
import {Title} from 'react-native-paper';
import theme from '../../styles/theme';
import {Alert, ScrollView, Text, TouchableOpacity} from 'react-native';
import Icon from '../../components/icon/icon.component';
import moment from 'moment';
import 'moment/locale/ru';
import RNPickerSelect from 'react-native-picker-select';

const NewSubscriptionComponent: React.FC<NewSubscriptionScreenProps> = ({
  navigation,
  route,
}) => {
  const store = useStore();
  const {id} = route.params ?? {id: undefined};
  // @ts-ignore
  const subscriptionData = store.app.subscriptions[id];
  const [color, setColor] = useState<string>(subscriptionData.color || 'black');

  const [name, setName] = useState<string>(subscriptionData.title || '');
  const [description, setDescription] = useState<string>('');
  const [sum, setSum] = useState<string>('');
  const [date, setDate] = useState<any>(undefined);
  const [currency, setCurrency] = useState<any>();
  const [frequency, setFrequency] = useState<string>('');
  const [reminder, setReminder] = useState<string>('');
  const [showDate, setShowDate] = useState<boolean>(false);
  const onChangeDate = (event: any, selectedValue: any) => {
    const currentDate = selectedValue || date;
    setDate(currentDate);
    setShowDate(false);
  };

  const addSubscription = useCallback(async () => {
    await store.app.updateMySubscriptions({
      id: (Math.random().toString(16) + '00000000000000000').slice(2, 12 + 2),
      title: name,
      description: description,
      sum: sum,
      date: date,
      currency: currency,
      reminder: reminder,
      color: color,
      frequency: frequency,
    });
    navigation.navigate('Home');
  }, [
    currency,
    date,
    description,
    name,
    reminder,
    store.app,
    sum,
    color,
    navigation,
  ]);
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
            onPress={addSubscription}
          />
        </>
      ),
    });
  }, [addSubscription, navigation, subscriptionData.title]);

  return (
    <GS.SafeAreaView>
      <ScrollView>
        <S.Container>
          <S.SubscriptionView
            style={{
              backgroundColor: subscriptionData.color || color,
            }}>
            <Title
              style={{color: theme.colors.brandWhite, marginRight: 'auto'}}>
              {name || subscriptionData.title}
            </Title>
            {sum.length > 0 ? (
              <>
                <Title style={styles.titleSum}>
                  {sum}
                  {currency || store.common.defaultCurrency}
                </Title>
              </>
            ) : null}
            {date ? (
              <>
                <Title style={styles.titleDate}>
                  {' '}
                  {moment(date).fromNow() === 'несколько секунд назад'
                    ? 'сегодня'
                    : moment(date).fromNow()}
                </Title>
              </>
            ) : null}
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
          <RNPickerSelect
            placeholder={{label: 'Нажмите чтобы выбрать валюту'}}
            style={{
              inputAndroid: {
                color: 'black',
              },
              inputIOS: {
                color: 'black',
              },
              viewContainer: {
                marginLeft: 30,
                width: '85%',
                height: 50,
                borderBottomWidth: 1,
                borderColor: 'slategray',
                borderStyle: 'solid',
                marginBottom: 20,
                justifyContent: 'center',
              },
            }}
            onValueChange={(value) => setCurrency(value)}
            items={[
              {label: 'Российский рубль', value: '₽'},
              {label: 'Доллар США', value: '$'},
              {label: 'Евро', value: '€'},
            ]}
          />
          <S.Input
            value={sum}
            placeholder={'Сумма'}
            keyboardType="numeric"
            onChangeText={(text: React.SetStateAction<string>) => setSum(text)}
          />
          <RNPickerSelect
            placeholder={{label: 'Частота платежей'}}
            style={{
              inputAndroid: {
                color: 'black',
              },
              inputIOS: {
                color: 'black',
              },
              viewContainer: {
                marginLeft: 30,
                width: '85%',
                height: 50,
                borderBottomWidth: 1,
                borderColor: 'slategray',
                borderStyle: 'solid',
                marginBottom: 20,
                justifyContent: 'center',
              },
            }}
            onValueChange={(value) => setFrequency(value)}
            items={[
              {label: 'Раз в неделю', value: 'Раз в неделю'},
              {label: 'Каждый месяц', value: 'Каждый месяц'},
              {label: 'Раз в три месяца', value: 'Раз в три месяца'},
              {label: 'Раз в год', value: 'Раз в год'},
              {label: 'Раз в две недели', value: 'Раз в две недели'},
              {label: 'Раз в полгода', value: 'Раз в полгода'},
            ]}
          />
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDate(true)}>
            <Text>
              {date ? moment(date).format('D MMMM YYYY') : 'Первый платёж'}
            </Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <RNPickerSelect
            placeholder={{label: 'Напоминание'}}
            style={{
              inputAndroid: {
                color: 'black',
              },
              inputIOS: {
                color: 'black',
              },
              viewContainer: {
                marginLeft: 30,
                width: '85%',
                height: 50,
                borderBottomWidth: 1,
                borderColor: 'slategray',
                borderStyle: 'solid',
                marginBottom: 20,
                justifyContent: 'center',
              },
            }}
            onValueChange={(value) => setReminder(value)}
            items={[
              {label: 'Не напоминать', value: 'Не напоминать'},
              {label: 'За день', value: 'За день'},
              {label: 'За два дня', value: 'За два дня'},
              {label: 'За три дня', value: 'За три дня'},
              {label: 'За неделю', value: 'За неделю'},
              {label: 'За две недели', value: 'За две недели'},
              {label: 'За месяц', value: 'За месяц'},
            ]}
          />
        </S.Container>
      </ScrollView>
    </GS.SafeAreaView>
  );
};

export default NewSubscriptionComponent;
