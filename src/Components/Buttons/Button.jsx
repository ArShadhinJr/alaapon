
const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`px-5 py-2 rounded active:scale-95 ${props.className}`}>{props.name}</button>
  )
}

export default Button