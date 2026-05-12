export default function InputField({ placeholder, type, inputValue }) {
  return (
    <input
      className="w-[300px] bg-purple-300 p-2 rounded-[30px]"
      placeholder={placeholder}
      type={type}
      onChange={(event) => {
        inputValue(event.target.value);
      }}
    />
  );
}
