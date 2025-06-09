
const TextInput = ({
    label,
    type,
    placeholder,
    register,
    className,
    labelClassName
}) => {
    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
            <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
                {label}
            </label>
            <input
                type= {type}
                placeholder={placeholder}
                className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
                id={label}
                {...register}
                
            />
        </div>
    );
};

export default TextInput;