import {createContext, useContext} from 'react';

import AppStore from './app-store';
import CommonStore from './common-store';


export class  RootStore {
  app: AppStore;
  common: CommonStore;

  constructor() {
    this.app = new AppStore();
    this.common = new CommonStore();
  }
}

const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
