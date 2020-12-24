import {observable, action} from 'mobx';
import DataStorage from '../utils/data-storage';

class AppStore {
  @observable subscriptions: any[] = [
    {id: 1, color: '#0083f8', title: '123 REG'},
    {id: 2, color: '#003ef8', title: '1Password'},
    {id: 3, color: 'red', title: '24-Hours-Fitness'},
    {id: 4, color: 'orange', title: 'AMAZON'},
    {id: 5, color: 'orange', title: 'AMAZON ASW'},
    {id: 6, color: 'orange', title: 'AMAZON Prime'},
    {id: 7, color: '#0083f8', title: 'Apple App Store'},
    {id: 8, color: '#000000', title: 'Apple Developer Program'},
    {id: 9, color: '#000000', title: 'Apple Music'},
  ];

  @observable mySubscriptions: any[] = [];

  @action async addMySubscriptions(data: any) {
    if (data) {
      this.setMySubscriptions([...this.mySubscriptions, data]);
      await DataStorage.storeItem('@my_subscriptions', this.mySubscriptions);
    }
  }

  @action async updateMySubscriptions(data: any) {
    const updateData = this.mySubscriptions.map((item: any) => {
      if (item.id === data.id) {
        return {
          ...item,
          ...data,
        };
      } else {
        return item;
      }
    });
    this.setMySubscriptions(updateData);
    await DataStorage.storeItem('@my_subscriptions', updateData);
  }

  @action async deleteMySubscriptions(idx: any) {
    const updateData = this.mySubscriptions.filter(
      (item: any) => idx !== item.id,
    );
    this.setMySubscriptions(updateData);
    await DataStorage.storeItem('@my_subscriptions', updateData);
  }

  @action setMySubscriptions(data: any) {
    this.mySubscriptions = data;
  }

  constructor() {}
}

export default AppStore;
