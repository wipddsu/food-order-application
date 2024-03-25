import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import CartContextProvider from './store/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Main />
    </CartContextProvider>
  );
}

export default App;
