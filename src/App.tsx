import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import BottomSheetProvider from './components/common/BottomSheet';
import ModalProvider from './components/common/Modal';
import router from './routes';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
    queryCache: new QueryCache({
      onError: (error: Error) => ({
        message: error.message,
      }),
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <RouterProvider router={router} />
        <ModalProvider />
        <BottomSheetProvider />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
