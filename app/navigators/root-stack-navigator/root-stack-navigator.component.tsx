import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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

//Components
// import Loader from '~/components/loader';
// import ChatAppBarMenu from '~/components/chat-app-bar-menu';
// import ChatAppBarTitle from '~/components/chat-app-bar-title';
// Store
// import {useStore} from '~/store';

// Styles
import theme from '../../styles/theme';
import SubscriptionsComponent from '../../screens/subscriptions-screen/subscriptions.component';
import {Text} from 'react-native';
import Icon from '../../components/icon/icon.component';
import NewSubscriptionComponent from '../../screens/new-subscription-screen';
import DataStorage from '../../utils/data-storage';
import {useStore} from '../../store';
import AsyncStorage from "@react-native-community/async-storage";
import EditComponent from "../../screens/edit-screen";

// Types
export type RootStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
  NewSubscription: undefined;
  Edit: {id: number} | undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Subscriptions: undefined;
  Edit: {id: number} | undefined;
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
              headerShown: true,
              title: 'Мои подписки',
              headerStyle: {
                backgroundColor: theme.colors.brandDark,
              },
              headerTitleStyle: {
                color: theme.colors.brandWhite,
              },
              headerTintColor: theme.colors.brandWhite,
            }}
          />
          <RootStack.Screen
            name="Subscriptions"
            component={SubscriptionsComponent}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.brandDark,
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
                backgroundColor: theme.colors.brandDark,
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
                backgroundColor: theme.colors.brandDark,
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
