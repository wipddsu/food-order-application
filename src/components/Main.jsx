import { useState, useEffect, useContext } from 'react';
import Meal from './Meal';
import useHttp from '../hooks/useHttp';

const requestConfig = {};

export default function Main() {
  const { data: meals, isFetching, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isFetching) {
    return <p className="center">Fetching meals...</p>;
  }

  return (
    <main id="meals">
      {error && <p className="center">An error ocurred! {error.message}</p>}
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
