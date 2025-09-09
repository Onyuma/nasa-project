interface SelectProps {
  options: string[];
  onChange(value: string): void;
  onClick(): void;
}
const Select = ({ options, onChange, onClick }: SelectProps) => {
  return (
    <div className="flex flex-row items-center gap-5 w-full h-full">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="flex-[3] border-2 p-4 "
      >
        {options.map((option) => {
          return <option>{option}</option>;
        })}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`flex-[1] bg-black text-[20px] text-white font-sans p-4 h-full w-full rounded-[2px] disabled:bg-gray-300`}
      >
        Filter Student
      </button>
    </div>
  );
};

export default Select;
