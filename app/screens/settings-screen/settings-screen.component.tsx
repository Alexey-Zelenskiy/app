import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import Icon from '../../components/icon/icon.component';
import theme from '../../styles/theme';
import GS from '../../styles';
import {useStore} from '../../store';
import RNPickerSelect from 'react-native-picker-select';
import {Modal, Portal} from 'react-native-paper';
import {TriangleColorPicker} from 'react-native-color-picker';

const SettingsScreen = observer(() => {
  const store = useStore();

  // const renderText = () => {
  //   if (store.common.defaultCurrency === '₽') {
  //     return <Text style={styles.text}>Российский рубль</Text>;
  //   }
  //   if (store.common.defaultCurrency === '€') {
  //     return <Text style={styles.text}>Евро</Text>;
  //   }
  //   if (store.common.defaultCurrency === '$') {
  //     return <Text style={styles.text}>Доллар США</Text>;
  //   }
  // };
  const [visibleChangeColor, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: 550,
  };
  return (
    <GS.SafeAreaView style={{backgroundColor: store.common.fonColor}}>
      <View style={styles.view}>
        <Portal>
          <Modal
            visible={visibleChangeColor}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text style={{marginBottom: 5}}>
              Нажмите на круг чтобы выбрать цвет.
            </Text>
            <Text>Верхняя/нижняя панель</Text>
            <TriangleColorPicker
              onColorSelected={(color) => store.common.setPanelColor(color)}
              style={{flex: 1}}
            />
            <Text>Фон</Text>
            <TriangleColorPicker
              onColorSelected={(color) => store.common.setFonColor(color)}
              style={{flex: 1}}
            />
          </Modal>
        </Portal>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Icon name={'dollar'} size={25} color={theme.colors.brandWhite} />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Валюта</Text>
            <RNPickerSelect
              value={store.common.defaultCurrency}
              placeholder={{label: 'Нажмите чтобы выбрать валюту'}}
              onValueChange={(value) => store.common.setCurrency(value)}
              items={[
                {label: 'Российский рубль', value: '₽'},
                {label: 'Доллар США', value: '$'},
                {label: 'Евро', value: '€'},
              ]}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.container} onPress={showModal}>
          <View style={styles.icon}>
            <Icon
              name={'dashboard'}
              size={25}
              color={theme.colors.brandWhite}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Цвет по умолчанию</Text>
          </View>
        </TouchableOpacity>
      </View>
    </GS.SafeAreaView>
  );
});

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    paddingRight: 15,
    paddingStart: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    height: 60,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'black',
  },
  row: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginTop: 0,
    bottom: -5,
    marginLeft: 7,
  },
});

export default SettingsScreen;
