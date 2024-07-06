import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import ModalProvider from './components/common/Modal';
import router from './routes';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ModalProvider />
    </QueryClientProvider>
  );
}

export default App;
