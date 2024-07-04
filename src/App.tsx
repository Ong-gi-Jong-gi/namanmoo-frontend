import { RouterProvider } from 'react-router-dom';
import ModalProvider from './components/common/Modal';
import router from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ModalProvider />
    </>
  );
}

export default App;
