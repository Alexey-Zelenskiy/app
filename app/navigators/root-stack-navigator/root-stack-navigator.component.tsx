import React, {useState, useRef, useLayoutEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

// Navigators
import HomeTabNavigator from '../home-tab-navigator';


// Styles
import theme from '../../styles/theme';

import SubscriptionsComponent from '../../screens/subscriptions-screen/subscriptions.component';
import NewSubscriptionComponent from '../../screens/new-subscription-screen';
import DataStorage from '../../utils/data-storage';
import {useStore} from '../../store';
import EditComponent from '../../screens/edit-screen';
import CreateScreenComponent from '../../screens/create-screen';

// Types
export type RootStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
  NewSubscription: undefined;
  Edit: {id: number} | undefined;
  Create: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Subscriptions: undefined;
  Edit: {id: number} | undefined;
  Settings: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

// Home stack screens
export type HomeStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
  Edit: {id: number} | undefined;
};

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

export type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

// Subscriptions stack screens
export type SubscriptionsStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
  Create: undefined;
  NewSubscription: {id: number} | undefined;
};

type SubscriptionsScreenRouteProp = RouteProp<
  SubscriptionsStackParamList,
  'Subscriptions'
>;

type SubscriptionsScreenNavigationProp = StackNavigationProp<
  SubscriptionsStackParamList,
  'Subscriptions'
>;

export type SubscriptionsScreenProps = {
  route: SubscriptionsScreenRouteProp;
  navigation: SubscriptionsScreenNavigationProp;
};

export type NewSubscriptionStackParamList = {
  NewSubscription: undefined;
  Home: undefined;
};

type NewSubscriptionScreenRouteProp = RouteProp<
  NewSubscriptionStackParamList,
  'NewSubscription'
>;

type NewSubscriptionScreenNavigationProp = StackNavigationProp<
  NewSubscriptionStackParamList,
  'NewSubscription'
>;

export type NewSubscriptionScreenProps = {
  route: NewSubscriptionScreenRouteProp;
  navigation: NewSubscriptionScreenNavigationProp;
};

export type EditScreenProps = {
  route: EditScreenRouteProp;
  navigation: EditScreenNavigationProp;
};

export type EditStackParamList = {
  Edit: undefined;
  Home: undefined;
};

type EditScreenRouteProp = RouteProp<EditStackParamList, 'Edit'>;
type EditScreenNavigationProp = StackNavigationProp<EditStackParamList, 'Edit'>;

export type CreateScreenProps = {
  route: CreateScreenRouteProp;
  navigation: CreateScreenNavigationProp;
};

export type CreateStackParamList = {
  Create: undefined;
  Home: undefined;
};

type CreateScreenRouteProp = RouteProp<CreateStackParamList, 'Create'>;
type CreateScreenNavigationProp = StackNavigationProp<
  CreateStackParamList,
  'Create'
>;

interface RootStackNavigatorProps {}

const RootStackNavigator: React.FC<RootStackNavigatorProps> = observer(() => {
  // const [initialized, setInitialized] = useState(false);
  const store = useStore();

  useLayoutEffect(() => {
    RNBootSplash.show();
    const getMySubscriptions = async () => {
      const data = await DataStorage.getItem('@my_subscriptions');
      if (data) {
        store.app.setMySubscriptions(JSON.parse(data));
        RNBootSplash.hide({duration: 500});
      }
    };
    getMySubscriptions().then();
  }, [store.app]);
  const navigatorRef = useRef<NavigationContainerRef | null>(null);
  // const navigate = useCallback((name: string, params?: any) => {
  //   navigatorRef.current?.navigate(name, params);
  // }, []);

  // if (!initialized) {
  //   return null;
  // }

  return (
    <>
      <NavigationContainer ref={navigatorRef}>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Subscriptions"
            component={SubscriptionsComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: store.common.panelColor,
              },
              headerTitleStyle: {
                color: theme.colors.brandWhite,
              },
              headerTintColor: theme.colors.brandWhite,
              title: 'Подписки',
            }}
          />
          <RootStack.Screen
            name="NewSubscription"
            component={NewSubscriptionComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: store.common.panelColor,
              },
              headerTitleStyle: {
                color: theme.colors.brandWhite,
              },
              headerTintColor: theme.colors.brandWhite,
            }}
          />
          <RootStack.Screen
            name="Edit"
            component={EditComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: store.common.panelColor,
              },
              headerTitleStyle: {
                color: theme.colors.brandWhite,
              },
              headerTintColor: theme.colors.brandWhite,
            }}
          />
          <RootStack.Screen
            name="Create"
            component={CreateScreenComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: store.common.panelColor,
              },
              headerTitleStyle: {
                color: theme.colors.brandWhite,
              },
              headerTintColor: theme.colors.brandWhite,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      {/*{store.common.isLoading && <Loader />}*/}
    </>
  );
});

export default RootStackNavigator;
