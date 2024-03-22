import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/meals');
        const data = await response.json();
        setMeals(data);

        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data' });
      }

      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  function handleAddToCart(e, select) {
    const selectedMeal = meals.filter((meal) => meal.id === select.id);
    setCart((prevCart) => [...prevCart, ...selectedMeal]);
  }

  return (
    <>
      <Cart cart={cart} />
      <Header cart={cart} />
      {error && <p>An error ocurred! {error.message}</p>}
      {!error && <Main meals={meals} onAddToCart={handleAddToCart} />}
    </>
  );
}

export default App;
