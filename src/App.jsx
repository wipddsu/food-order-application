import Header from './components/Header';
import Main from './components/Main';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import CartContextProvider from './store/CartContext';
import UserProgressContextProvider from './store/UserProgressContext';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Main />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
