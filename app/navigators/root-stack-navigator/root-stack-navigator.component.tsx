import React, {useEffect, useState, useRef} from 'react';
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

// Types
export type RootStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
  NewSubscription: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Subscriptions: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

// Home stack screens
export type HomeStackParamList = {
  Home: undefined;
  Subscriptions: undefined;
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
  // const store = useStore();
  const navigatorRef = useRef<NavigationContainerRef | null>(null);
  // const navigate = useCallback((name: string, params?: any) => {
  //   navigatorRef.current?.navigate(name, params);
  // }, []);

  // useEffect(() => {
  //   RNBootSplash.show();
  //   store.auth.signInWithSavedToken().then(() => {
  //     setInitialized(true);
  //     RNBootSplash.hide({duration: 500});
  //   });
  // }, [store.auth]);

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
        </RootStack.Navigator>
      </NavigationContainer>
      {/*{store.common.isLoading && <Loader />}*/}
    </>
  );
});

export default RootStackNavigator;
