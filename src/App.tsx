import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes';
import '@hotosm/ui/dist/style.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<LoadingComponent />}
        persistor={persistor}
        >
          <RouterProvider router={AppRoutes} />
      </PersistGate>
    </Provider>
  );
};

const LoadingComponent = () => <div>Loading...</div>;

export default App;