function InputFormTodo({
  text,
  icon: Icon,
  handleChange,
  value,
  placeholder,
  type = 'text',
  id,
  error
}) {
  return (
    <div className="mb-6">
        {/* <label 
          htmlFor={id} 
          className="">
          <Icon className="" />{text}
        </label> */}

        <input className={`border-b-2 w-full text-2xl py-3 text-white/50 placeholder-white-50 focus:outline-0 ${error ? "border-red-500" : ""}`} 
        id = {id}
        onChange={handleChange}
        value={value}
        type= {type}
        placeholder={placeholder}
        />
        {error && <p className="helperText mt-1 text-red-400 text-[14px]">{error}</p>}
    </div>
  )
}

export default InputFormTodo