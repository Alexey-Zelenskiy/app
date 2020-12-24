import {observable, action} from 'mobx';

class CommonStore {
  @observable isLoading: boolean = false;
  @observable defaultCurrency: string = '₽';
  @observable fonColor: string = '#f1f1f1';
  @observable panelColor: string = '#2D3640';
  @action
  setLoading(value: boolean) {
    this.isLoading = value;
  }
  @action
  setCurrency(value: string) {
    this.defaultCurrency = value;
  }
  @action
  setFonColor(value: string) {
    this.fonColor = value;
  }
  @action
  setPanelColor(value: string) {
    this.panelColor = value;
  }
}

export default CommonStore;
