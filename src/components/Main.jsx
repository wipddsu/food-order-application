import { useState, useEffect, useContext } from 'react';
import Button from './UI/Button';

import { currencyFormatter } from '../utils/formatting';
import { CartContext } from '../store/CartContext';

export default function Main() {
  const { cart, addItem } = useContext(CartContext);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [meals, setMeals] = useState([]);

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

  return (
    <main id="meals">
      {error && <p>An error ocurred! {error.message}</p>}
      {!error && (
        <>
          {meals.map((meal) => (
            <div key={meal.id} className="meal-item">
              <article>
                <img src={`http://localhost:3000/${meal.image}`}></img>
                <div>
                  <h3>{meal.name}</h3>
                  <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                  <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                  <Button onClick={() => addItem(meal)}>Add to Cart</Button>
                </p>
              </article>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
