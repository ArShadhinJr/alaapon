
import { Link, useNavigate } from "react-router-dom"
import CenterDiv from "../CenterDiv/CenterDiv"
import Input from "../Input/Input"
import logo from './../../assets/alaaponlogo.png'
import Button from "../Buttons/Button"
import { useState } from "react"
import Error from "../Error/Error"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
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
      .then((userCredential) => {
        const user = userCredential.user
        sendEmailVerification( auth.currentUser)
        .then( () => {
          reset()
        toast.success( "Registration Successful", {} )
        setTimeout( () => {
          navigate("/")
        }, 2000)
        } )
        updateProfile(user, {
          displayName: values.name
        })
          .then(() => {
            
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode)
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
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
    <CenterDiv className="md:w-[800px] w-11/12 sm:mx-0  md:flex bg-primary rounded-lg">
      <div className="md:w-2/5 bg-[url('https://i.ibb.co/PtnD1Hj/pexels-miguel-padri-n-1111368-1.jpg')] rounded-lg md:rounded-r-none rounded-b-none bg-cover">
        <h2 className="text-white font-bold text-3xl px-6 py-10">User Registration Form</h2>
      </div>
      <div className="md:w-3/5 text-white px-10 py-12">
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
              <p><Link to="/" className="hover:text-gray-100 hover:underline ">Already have account</Link></p>
              <Button className="bg-thirty" >Sign Up</Button>
            </div>
          </div>
        </form>
      </div>
    </CenterDiv>
    </>
  )
}

export default Registration