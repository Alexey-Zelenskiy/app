import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react-lite';

// Navigators
import {HomeTabParamList} from '../root-stack-navigator/root-stack-navigator.component';

// Store
import {useStore} from '../../store';
// Screens
import HomeScreen from '../../screens/home-screen';

// Components
import Icon from '../../components/icon';
import CustomBottomTabBar from '../../components/custom-bottom-tab-bar';


const Tab = createBottomTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps {}

const HomeTabNavigator: React.FC<HomeTabNavigatorProps> = observer(() => {
  const store = useStore();

  return (
    <Tab.Navigator tabBar={(props) => <CustomBottomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Мои подписки',
          tabBarIcon: (props) => <Icon name="bell" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
});

export default HomeTabNavigator;
