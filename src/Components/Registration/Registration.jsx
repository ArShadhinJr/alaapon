
import { Link } from "react-router-dom"
import CenterDiv from "../CenterDiv/CenterDiv"
import Input from "../Input/Input"
import logo from './../../assets/alaaponlogo.png'
import Button from "../Buttons/Button"

const Registration = () => {
  return (
    <CenterDiv className="w-[800px] flex bg-primary rounded-lg">
      <div className="w-2/5 bg-signup rounded-lg rounded-r-none bg-cover">
        <h2 className="text-white font-bold text-3xl px-6 py-10">User Registration Form</h2>
      </div>
      <div className="w-3/5 text-white px-10 py-12">
        <img src={logo} className="w-36 mb-4"/>
        <h3 className="text-2xl">Registration</h3>
        <form>
          <div>
            <Input type="text" label="Full Name" />
            <Input type="email" label="Email Address" />
            <Input type="password" label="Password" />
            <div className="flex items-center justify-between mt-8">
              <p><Link to="/login" className="hover:text-gray-100 hover:underline ">Already have account</Link></p>
              <Button className="bg-thirty" name="Login"></Button>
            </div>
          </div>
        </form>
      </div>
    </CenterDiv>
  )
}

export default Registration