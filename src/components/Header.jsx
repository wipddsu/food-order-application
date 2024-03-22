import logo from '../assets/logo.jpg';

export default function Header() {
  return (
    <header id="main-header">
      <h1 id="title">
        <img src={logo} alt="logo image" />
        REACTFOOD
      </h1>
      <button className="text-button">Cart</button>
    </header>
  );
}
