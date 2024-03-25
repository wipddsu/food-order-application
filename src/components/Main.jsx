import { currencyFormatter } from '../utils/formatting';

export default function Main({ meals, onAddToCart }) {
  return (
    <main id="meals">
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
              <button className="button" onClick={() => onAddToCart(meal)}>
                Add to Cart
              </button>
            </p>
          </article>
        </div>
      ))}
    </main>
  );
}
