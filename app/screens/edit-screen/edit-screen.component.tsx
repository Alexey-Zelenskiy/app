import React, {useCallback, useLayoutEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {EditScreenProps} from '../../navigators/root-stack-navigator/root-stack-navigator.component';
import GS from '../../styles';
import S, {styles} from './edit-screen.styled';
import {useStore} from '../../store';
import {Title} from 'react-native-paper';
import theme from '../../styles/theme';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from '../../components/icon/icon.component';
import moment from 'moment';
import 'moment/locale/ru';
import RNPickerSelect from 'react-native-picker-select';
import {Modal, Portal} from 'react-native-paper';
import {ColorPicker} from 'react-native-color-picker';
import {observer} from 'mobx-react-lite';

const EditScreenComponent: React.FC<EditScreenProps> = observer(
  ({navigation, route}) => {
    const store = useStore();
    const {id} = route.params ?? {id: undefined};
    // @ts-ignore
    const subscriptionData = store.app.mySubscriptions[id];
    const [color, setColor] = useState<string>(subscriptionData.color);

    const [visibleChangeColor, setVisible] = useState<boolean>(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const [favorite, setFavorite] = useState<boolean>(false);

    const onChangeFavorite = () => {
      setFavorite(!favorite);
    };

    const [name, setName] = useState<string>(subscriptionData.title || '');
    const [description, setDescription] = useState<string>(
      subscriptionData.description || '',
    );
    const [sum, setSum] = useState<string>(subscriptionData.sum || '');
    const [date, setDate] = useState<any>(subscriptionData.date);
    const [currency, setCurrency] = useState<any>(
      subscriptionData.currency || '',
    );
    const [frequency, setFrequency] = useState<string>(
      subscriptionData.frequency || '',
    );
    const [reminder, setReminder] = useState<string>(
      subscriptionData.reminder || '',
    );
    const [showDate, setShowDate] = useState<boolean>(false);
    const onChangeDate = (event: any, selectedValue: any) => {
      const currentDate = selectedValue || date;
      setDate(currentDate);
      setShowDate(false);
    };

    const addSubscription = useCallback(async () => {
      await store.app.updateMySubscriptions({
        id: subscriptionData.id,
        title: name,
        description: description,
        sum: sum,
        date: date,
        currency: currency,
        reminder: reminder,
        color: color,
        frequency: frequency,
        favorite: favorite,
      });
      navigation.navigate('Home');
    }, [
      store.app,
      subscriptionData,
      name,
      description,
      sum,
      date,
      currency,
      reminder,
      color,
      frequency,
      favorite,
      navigation,
    ]);

    const deleteSubscription = useCallback(async () => {
      await store.app.deleteMySubscriptions(subscriptionData.id);
      navigation.navigate('Home');
    }, [navigation, store.app, subscriptionData.id]);

    const deleteAlert = useCallback(
      () =>
        Alert.alert(
          'Delete',
          'Вы действительно хотите удалить подписку?',
          [
            {
              text: 'Отмена',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Да', onPress: () => deleteSubscription()},
          ],
          {cancelable: false},
        ),
      [deleteSubscription],
    );

    useLayoutEffect(() => {
      navigation.setOptions({
        title: subscriptionData.title || 'Моя подписка',
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="check"
              size={20}
              color={theme.colors.brandWhite}
              style={{marginRight: 30}}
              onPress={addSubscription}
            />
            <Icon
              name="trash"
              size={20}
              color={theme.colors.brandWhite}
              style={{marginRight: 10}}
              onPress={deleteAlert}
            />
          </View>
        ),
      });
    }, [addSubscription, deleteAlert, navigation, subscriptionData.title]);

    const containerStyle = {
      backgroundColor: 'white',
      padding: 20,
      height: 500,
    };

    return (
      <GS.SafeAreaView style={{backgroundColor: store.common.fonColor}}>
        <ScrollView>
          <S.Container>
            <Portal>
              <Modal
                visible={visibleChangeColor}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}>
                <Text>Нажмите на круг чтобы выбрать цвет.</Text>
                <ColorPicker
                  onColorSelected={(color) => setColor(color)}
                  style={{flex: 1}}
                />
              </Modal>
            </Portal>
            <S.SubscriptionView
              onPress={showModal}
              style={{
                backgroundColor: color,
              }}>
              <Icon
                name={favorite ? 'star' : 'star-o'}
                size={20}
                color={theme.colors.brandWhite}
                style={{marginRight: 10}}
                onPress={onChangeFavorite}
              />
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
              value={name}
              placeholder={'Название'}
              onChangeText={(text: React.SetStateAction<string>) =>
                setName(text)
              }
            />
            <S.Input
              value={description}
              placeholder={'Описание'}
              onChangeText={(text: React.SetStateAction<string>) =>
                setDescription(text)
              }
            />
            <RNPickerSelect
              value={currency}
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
              onChangeText={(text: React.SetStateAction<string>) =>
                setSum(text)
              }
            />
            <RNPickerSelect
              value={frequency}
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
              value={reminder}
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
  },
);

export default EditScreenComponent;
