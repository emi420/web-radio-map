import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import Send from './views/Send/Send';
import MainView from './views/MainView';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainView />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/send',
        element: <Send />
      },
    ]
  },
]);

export default routes;
