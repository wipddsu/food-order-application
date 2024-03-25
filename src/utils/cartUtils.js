// 중복 데이터 전처리 후 장바구니 총 가격 계산
export function calcTotalPrice(items) {
  const itemPriceArr = items.map((item) => +item.price * item.total);
  const totalPrice = itemPriceArr.reduce((acc, cur) => acc + cur, 0);

  return totalPrice.toFixed(2);
}
