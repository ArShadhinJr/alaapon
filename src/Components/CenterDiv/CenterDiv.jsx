
const CenterDiv = (props) => {
  return (
    <div className={`relative h-screen w-full ${props.classNameMain}`}>
        <div className={`absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 ${props.className}`}>
            {props.children}
        </div>
    </div>
  )
}

export default CenterDiv