
import { Link, useNavigate } from "react-router-dom"
import CenterDiv from "../CenterDiv/CenterDiv"
import Input from "../Input/Input"
import logo from './../../assets/alaaponlogo.png'
import Button from "../Buttons/Button"
import { useState } from "react"
import Error from "../Error/Error"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify"


const Registration = () => {

  const auth = getAuth()
  const navigate = useNavigate()

  const [ values, setValues ] = useState( {
    name: "",
    email: "", 
    password: ""
  } )


  const [ errors, setErrors ] = useState( {
    name: "", 
    email: "", 
    password: ""
  })
  
  const handleValues = ( e ) => {
    setValues(
      {
        ...values,
        [e.target.name]: e.target.value
      }
    )
    setErrors(
      {
        ...errors, 
        [e.target.name]: e.target.value ? "" : `Please type your ${e.target.name}`
      }
    )
  }

  const reset = () => {
    setErrors({
      name: "",
      email: "",
      password: ""
    } )
    setValues({
      name: "",
      email: "",
      password: ""
    })
  }

  const handleSubmit = ( e ) => {
    e.preventDefault()
    if( values.name === "" || values.email === "" || values.password === "") {
      setErrors({
        name: values.name === "" ? "Please type your name" : "",
        email: values.email === "" ? "Please type your email" : "",
        password: values.password === "" ? "Please type your password" : ""
      })
    }

    if ( values.name && values.email && values.password ) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        sendEmailVerification( auth.currentUser)
        .then( () => {
          reset()
        toast.success( "Registration Successful", {} )
        setTimeout( () => {
          navigate("/login")
        }, 2000)
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
      
      
    }
  }

  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    <CenterDiv className="w-[800px] flex bg-primary rounded-lg">
      <div className="w-2/5 bg-signup rounded-lg rounded-r-none bg-cover">
        <h2 className="text-white font-bold text-3xl px-6 py-10">User Registration Form</h2>
      </div>
      <div className="w-3/5 text-white px-10 py-12">
        <img src={logo} className="w-36 mb-4"/>
        <h3 className="text-2xl">Registration</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <Input type="text" name="name" value={values.name} onChange={handleValues} label="Full Name" />
            <Error>{errors.name}</Error>
            <Input type="email" name="email" value={values.email} onChange={handleValues} label="Email Address" />
            <Error>{errors.email}</Error>
            <Input type="password" name="password" value={values.password} onChange={handleValues} label="Password" />
            <Error>{errors.password}</Error>
            <div className="flex items-center justify-between mt-8">
              <p><Link to="/login" className="hover:text-gray-100 hover:underline ">Already have account</Link></p>
              <Button className="bg-thirty" name="Sign Up"></Button>
            </div>
          </div>
        </form>
      </div>
    </CenterDiv>
    </>
  )
}

export default Registration