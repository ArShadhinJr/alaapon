import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button"
import CenterDiv from "../CenterDiv/CenterDiv"
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import demoPP from '../../assets/demo.avif'
import logo from '../../assets/alaaponlogo.png'
import { setUser } from "../../Slice/userSlice";


const Homee = () => {

    const user = useSelector( ( state ) => state.user.userInfo )
    console.log(user)
    const auth = getAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSignOut = () => {
        signOut(auth).then(() => {
        setTimeout(() => {
            navigate("/")
        }, 2000 );
        toast.success("Sign Out")
            localStorage.removeItem( 'user' )
            dispatch( setUser( null ) )
        }).catch((error) => {
        console.log(error)
        });
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
        <CenterDiv className="w-96 bg-primary rounded-lg text-center py-5">
            <img src={logo} className="w-36 inline-block " />
            <h2 className="text-xl bg-white inline-block text-primary font-black p-1 rounded ml-4">Home</h2>
            <h3 className="text-xl text-white">Name: {user?.displayName}</h3>
            <h3 className="text-xl text-white">Email: {user?.email}</h3>
            {
                user ? <div className="text-center mt-3">
                <img src={user?.photoURL ? user?.photoURL : demoPP} className="rounded-full inline-block w-36" />
            </div> : null
            }
            <Button onClick={handleSignOut} className="bg-thirty text-white mt-2" >Sign Out</Button>
        </CenterDiv>
    </>
  )
}

export default Homee