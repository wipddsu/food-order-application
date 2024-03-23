// 중복 데이터 추출하여 프로퍼티로 중복횟수 추가
export function mealsInCart(cart) {
  return cart.reduce((acc, curr) => {
    const foundIndex = acc.findIndex((item) => item.id === curr.id);
    if (foundIndex === -1) {
      acc.push({ ...curr, total: 1 });
    } else {
      acc[foundIndex].total++;
    }
    return acc;
  }, []);
}

// 중복 데이터 전처리 후 장바구니 총 가격 계산
export function calcTotalPrice(meals) {
  const mealsPrices = meals.map((item) => +item.price * item.total);
  const total = mealsPrices.reduce((acc, cur) => acc + cur, 0);

  return total.toFixed(2);
}
