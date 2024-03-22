import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Modal from './components/layouts/Modal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');
      const data = await response.json();

      setMeals(data);
    }

    fetchMeals();
  }, []);

  console.log(meals);

  return (
    <>
      <Header />
      <Main meals={meals} />
    </>
  );
}

export default App;
