import { useState, useEffect, useContext } from 'react';
import Meal from './Meal';

export default function Main() {
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
      {error && <p style={{ textAlign: 'center' }}>An error ocurred! {error.message}</p>}
      {!error && (
        <>
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </>
      )}
    </main>
  );
}
