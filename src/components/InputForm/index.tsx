import React from "react";

interface InputFormProps {
  id?: string;
  name?: string;
  label: string;
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({
  id,
  name,
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
}: InputFormProps) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div className="flex flex-col gap-2">
        <label className="text-[#333333] font-bold">{label}</label>
        <input
          id={id}
          name={name}
          className="h-[35px] border-[1.5px] rounded-[10px] p-3 border-[#D9D9D9]"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputForm;
