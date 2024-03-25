export default function Input({ children, inputName, ...props }) {
  return (
    <div className="control">
      <label htmlFor={inputName}>{children}</label>
      <input id={inputName} name={inputName} {...props} required />
    </div>
  );
}
