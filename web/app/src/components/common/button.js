function Button({ onClick = () => {}, text = "", type, loading = false }) {
  return (
    <button onClick={onClick} className="" type={type}>
      {loading ? text : "Loading..."}
    </button>
  );
}

export default Button;
