import { Navigate, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button"
import CenterDiv from "../CenterDiv/CenterDiv"
import Input from "../Input/Input"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast , ToastContainer } from "react-toastify"

const Forgot = () => {

    const auth = getAuth();
    const navigate = useNavigate()
    
    const handleResetPassword = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        if (email){
            sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success( "Email sent. Please check your email." )
                setTimeout( () => {
                    navigate( '/' )
                }, 2000 )
            })
            .catch((error) => {
                toast.error( error.message )
            } )
        }
    }
  return (
      <>
          <ToastContainer
          
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <CenterDiv className="bg-primary  rounded-lg text-white p-4" >
        <h3 className="text-2xl font-black">Forgot Password?</h3>
        <p className="text-sm font-mono">Enter your email address, send an email to reset your password</p>
        <form onSubmit={handleResetPassword}>
            <Input type="email" name="email" label="Email Address" />
            <Button className="bg-white text-black mt-4">Reset Password</Button>
        </form>
    </CenterDiv>
    </>
  )
}

export default Forgot