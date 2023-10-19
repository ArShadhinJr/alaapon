
const Input = (props) => {
  return (
    <div className="relative z-0 w-full mt-6 group">
      <input type={props.type} name={props.name} id={props.type} value={props.value} onChange={props.onChange} className={`block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer ${props.className}`} placeholder=" " />
      <label for={props.type} className="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.label}</label>
  </div>
  )
}

export default Input