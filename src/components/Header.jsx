import logo from '../assets/logo.jpg';

export default function Header({ cart }) {
  return (
    <header id="main-header">
      <h1 id="title">
        <img src={logo} alt="logo image" />
        REACTFOOD
      </h1>
      <button className="text-button">Cart{cart.length > 0 && `(${cart.length})`}</button>
    </header>
  );
}
