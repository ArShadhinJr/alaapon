import { useNavigate } from "react-router-dom";
import Button from "../Buttons/Button"
import CenterDiv from "../CenterDiv/CenterDiv"
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";



const Home = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
        setTimeout(() => {
            navigate("/")
        }, 2000 );
        toast.success("Sign Out")
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
        <CenterDiv className="w-96 h-96 bg-primary rounded-lg text-center py-5">
            <h2 className="text-2xl text-white text-center">This is Home</h2>
            <Button onClick={handleSignOut} className="bg-thirty text-white mt-2" name="Sign Out"></Button>
        </CenterDiv>
    </>
  )
}

export default Home