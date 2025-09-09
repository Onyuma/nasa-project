import { useState } from "react";

interface EditTabProps {
  completed?: boolean;
  tabName: string;
  tabValue?: string;
  isId?: boolean;
  checkBox?: boolean;
  name: string;
}

const EditTab = ({
  completed,
  isId,
  tabName,
  tabValue,
  checkBox = false,
  name,
}: EditTabProps) => {
  const [value, setValue] = useState(tabValue);
  const [checked, setChecked] = useState(completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-2/3 justify-between items-center  ">
      <p className="p-5 w-2xs text-[20px] text-gray-500 font-medium">
        {tabName}
      </p>
      {checkBox ? (
        <input
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          type="checkbox"
          name={name}
          className={` w-full h-10 p-5 border-gray-400 ${
            isId ? "bg-gray-100 border-0" : "bg-white border-1 "
          }`}
        />
      ) : (
        <input
          type="text"
          disabled={isId}
          name={name}
          className={` w-full h-10 p-6 border-gray-400 ${
            isId ? "bg-gray-100 border-0" : "bg-white border-1 "
          }`}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default EditTab;
