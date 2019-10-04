import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login'
import List from './pages/List'
import Booking from './pages/Booking'

const Routes = createAppContainer(
  createSwitchNavigator({
    Login, 
    List, 
    Booking
  })
);

export default Routes;