/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
import App from './app/app';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps',
  'Warning: Require cycle',
]);

AppRegistry.registerComponent(appName, () => App);
