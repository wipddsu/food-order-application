import { useContext } from 'react';
import Button from './UI/Button';

import { currencyFormatter } from '../utils/formatting';
import { CartContext } from '../store/CartContext';

export default function Meal({ meal }) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="meal-item">
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
  );
}
