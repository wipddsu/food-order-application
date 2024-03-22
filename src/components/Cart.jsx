import Modal from './layouts/Modal';

export default function Cart({ cart, onPlusMeal, onMinusMeal }) {
  let totalPrice;

  const allMeals =
    // 중복 데이터 추출하여 프로퍼티로 중복횟수 추가
    cart.reduce((acc, curr) => {
      const foundIndex = acc.findIndex((item) => item.id === curr.id);
      if (foundIndex === -1) {
        acc.push({ ...curr, num: 1 });
      } else {
        acc[foundIndex].num++;
      }
      return acc;
    }, []) || [];

  if (cart.length > 0) {
    // 중복 데이터 전처리 후 장바구니 총 가격 계산
    function calcTotalPrice() {
      const mealsPrices = allMeals.map((item) => +item.price * item.num);
      const total = mealsPrices.reduce((acc, cur) => acc + cur, 0);

      return total.toFixed(2);
    }
    totalPrice = calcTotalPrice();
  }

  return (
    <Modal>
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {allMeals.map((item) => (
            <li className="cart-item" key={item.id}>
              <p>{item.name}</p>
              <div className="cart-item-actions">
                <button onClick={() => onMinusMeal(item)}>-</button>
                {item.num}
                <button onClick={() => onPlusMeal(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <span className="cart-total">$ {totalPrice}</span>
        <div className="modal-actions">
          <button className="text-button">close</button>
          <button className="button">Go to Checkout</button>
        </div>
      </div>
    </Modal>
  );
}
