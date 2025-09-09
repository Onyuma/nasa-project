interface InputProps {
  onChange(value: string): void;
}
const Input = ({ onChange }: InputProps) => {
  return (
    <input
      type="text"
      name="task"
      className="border-2 p-4 w-full h-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
