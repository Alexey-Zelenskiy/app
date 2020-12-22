import AsyncStorage from '@react-native-community/async-storage';

export default class DataStorage {
  private static REFRESH_TOKEN_STORAGE_KEY: string = '@refresh_token';
  private static ACCESS_TOKEN_STORAGE_KEY: string = '@access_token';

  static async storeRefreshToken(refreshToken: string): Promise<boolean> {
    return DataStorage.storeItem(this.REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }

  static async storeAccessToken(accessToken: string): Promise<boolean> {
    return DataStorage.storeItem(this.ACCESS_TOKEN_STORAGE_KEY, accessToken);
  }

  static async getAccessToken(): Promise<string | null> {
    return DataStorage.getItem(DataStorage.ACCESS_TOKEN_STORAGE_KEY);
  }

  static async getRefreshToken(): Promise<string | null> {
    return DataStorage.getItem(DataStorage.REFRESH_TOKEN_STORAGE_KEY);
  }

  static async removeAccessToken(): Promise<boolean> {
    return DataStorage.removeItem(DataStorage.ACCESS_TOKEN_STORAGE_KEY);
  }

  static async removeRefreshToken(): Promise<boolean> {
    return DataStorage.removeItem(DataStorage.ACCESS_TOKEN_STORAGE_KEY);
  }

  static async storeItem(key: string, item: string | object): Promise<boolean> {
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

  static async getItem(key: string): Promise<string | null> {
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
