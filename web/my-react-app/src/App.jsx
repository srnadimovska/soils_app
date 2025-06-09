import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './pages/Root';
import Homepage from './pages/Homepage';
import ProtectRoute from './components/ProtectRoute';
import Login from './pages/Login';
import Pocva from './pages/Pocva';
import Crops from './pages/Crops';
import Fertilizers from './pages/Fertilizers';
import Signup from './pages/Signup';
import PocvaChat from './pages/PocvaChat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error/>,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />
      },

      {
        element: <ProtectRoute />,
        children: [
          { index: true, 
            element: <Homepage />
          },
          {
            path: 'pocvi',
            element: <Pocva />
          },
          {
            path: 'kulturi',
            element: <Crops />
          },
          {
            path: 'gjubriva',
            element: <Fertilizers />
          },
          {
            path:'pocva-chat',
            element: <PocvaChat />
          }
        ],
      },
    ],
  },
]);




function App() {
  

  return <RouterProvider router={router}/>
}

export default App;
