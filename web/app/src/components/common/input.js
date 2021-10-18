function Input({
  placeholder = "", // TODO: implement
  charLimit = 1000, // TODO: implement
  error = "", // TODO: implement
  value,
  rows = 1,
  onChange,
  onBlur,
  type="text",
  id, // TODO: implement
  name, // TODO: implement
  required = false,
  trim = false, // TODO: implement

}) {
  return (
    <div>
      {rows > 1 ? (
        <textarea id={id} required={required} rows={rows} className="" onChange={onChange} onBlur={onBlur} />
      ) : (
        <input id={id} required={required} type={type} className="" onChange={onChange} onBlur={onBlur} />
      )}
    </div>
  );
}

export default Input;
