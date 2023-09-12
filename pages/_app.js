import Template from '../components/template';
import { QueryClient, QueryClientProvider } from 'react-query';
import WrapperLeftLayout from '../components/wrapper-left-layout';
import { TokenProvider } from '../auth/token-provider';
import { UserProvider } from '../auth/user-provider';
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from '../components/protected-route';
import '../styles/main.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <TokenProvider router={router}>
          <UserProvider>
            <Template>
              <ProtectedRoute router={router}>
                <WrapperLeftLayout>
                  <Component {...pageProps} />
                </WrapperLeftLayout>
              </ProtectedRoute>
            </Template>
          </UserProvider>
        </TokenProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
