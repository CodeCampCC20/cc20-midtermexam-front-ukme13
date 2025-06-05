function InputForm({
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

        <input className={`bg-[#384150] w-full p-4 rounded-xl text-white/50 placeholder-white-50 ${error ? "outline-1 outline-red-500" : "outline-0"}`} 
        id = {id}
        onChange={handleChange}
        value={value}
        type= {type}
        placeholder={placeholder}
        />
        {error && <p className="helperText mt-1 text-red-400 text-s">{error}</p>}
    </div>
  )
}

export default InputForm