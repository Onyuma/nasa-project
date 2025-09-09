interface BtnProps {
  action?(): void;
  disabled?: boolean;
  title: string;
  type: "submit" | "delete" | "others";
}

const Button = ({ action, disabled = false, title, type }: BtnProps) => {
  let bgColor;
  switch (type) {
    case "submit":
      bgColor = "bg-blue-500";
      break;
    case "delete":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-grey-500";
  }
  return (
    <button
      disabled={disabled}
      onClick={action}
      children={title}
      className={`${bgColor} text-[20px] text-white font-sans p-4 h-full w-full rounded-[2px] disabled:bg-gray-300`}
    />
  );
};

export default Button;
