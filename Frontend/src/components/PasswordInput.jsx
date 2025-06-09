const PasswordInput = ({
    label,
    placeholder,
    register,
}) => {
    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full my-3`}>
            <label htmlFor={label} className={`font-semibold`}>
                {label}
            </label>
            <input
                type="password"
                placeholder={placeholder}
                className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
                id={label}
                {...register}
            />
        </div>
    );
};

export default PasswordInput;