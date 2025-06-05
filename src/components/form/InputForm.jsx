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
    <div className="">
        <label 
          htmlFor={id} 
          className="">
          <Icon className="" />{text}
        </label>

        <input className={`${error ? "outline-1 outline-red-500" : "outline-0"}`} 
        id = {id}
        onChange={handleChange}
        value={value}
        type= {type}
        placeholder={placeholder}
        />
        {error && <p className="helperText">{error}</p>}
    </div>
  )
}

export default InputForm