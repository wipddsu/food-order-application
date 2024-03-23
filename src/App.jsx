import { useEffect, useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';

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

  function handleAddToCart(select) {
    const selectedMeal = meals.filter((meal) => meal.id === select.id);

    setCart((prevCart) => [...prevCart, ...selectedMeal]);
  }

  function handleRemoveFromCart(select) {
    const index = cart.findIndex((item) => item.id === select.id);
    const cartCopy = [...cart];
    const removedProduct = cartCopy.splice(index, 1);

    setCart(cartCopy);
  }

  return (
    <>
      <Header cart={cart} onPlusMeal={handleAddToCart} onMinusMeal={handleRemoveFromCart} />
      {error && <p>An error ocurred! {error.message}</p>}
      {!error && <Main meals={meals} onAddToCart={handleAddToCart} />}
    </>
  );
}

export default App;
