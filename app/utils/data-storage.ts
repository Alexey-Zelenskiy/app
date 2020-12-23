import AsyncStorage from '@react-native-community/async-storage';

export default class DataStorage {
  private static MY_SUBSCRIPTION: string = '@my_subscription';

  static async storeMySubscription(data: any){
    return DataStorage.storeItem(this.MY_SUBSCRIPTION, data);
  }
  static async getMySubscription(): Promise<string | null> {
    return DataStorage.getItem(DataStorage.MY_SUBSCRIPTION);
  }

  static async storeItem(key: string, item: string | object | any) {
    try {
      await AsyncStorage.setItem(
        key,
        typeof item === 'string' ? item : JSON.stringify(item),
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  static async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (err) {
      return false;
    }
  }
}
