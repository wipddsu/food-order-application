export default function Main({ meals }) {
  return (
    <main id="meals">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-item">
          <article>
            <img src={`http://localhost:3000/${meal.image}`}></img>
            <h3>{meal.name}</h3>
            <div>
              <span className="meal-item-price">{meal.price}</span>
              <p className="meal-item-description">{meal.description}</p>
              <button className="meal-item-actions button">Add to Cart</button>
            </div>
          </article>
        </div>
      ))}
    </main>
  );
}
