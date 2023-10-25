import { getAuth, signOut, updateProfile } from "firebase/auth"
import React, { createRef, useEffect, useState } from "react"
import { AiFillBell, AiFillHome, AiFillSetting } from "react-icons/ai"
import { BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs'
import { FaCommentDots } from "react-icons/fa"
import { RiUploadCloudFill } from 'react-icons/ri'
import { VscSignOut } from 'react-icons/vsc'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { setUser } from "../../Slice/userSlice"
import logo from '../../assets/alaaponlogo.png'
import demoImg from '../../assets/demo.avif'
import ModalProfileUpdate from "../ModalProfileUpdate/ModalProfileUpdate"
// crop image and upload in firebase 
import "cropperjs/dist/cropper.css"
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"



const Home = () => {

    const [ online, setOnline ] = useState( true )
    
    const handleOnlineStatus = () => {
    if (navigator.onLine) {
        // User is online
        setOnline( true );
        toast.success("You are online")
    } else {
        // User is offline
        setOnline( false );
        toast.error("You are offline")
    }
    };

    useEffect(() => {
    // Add event listener for online/offline changes
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
     }, []);
    


    const storage = getStorage();
    
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    
    const [showModal , setShowModal] = React.useState(false)

    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [showSidebar, setShowSidebar] = React.useState(screen.width > 768 ? true : false)
    
    const menuDatas = [
        {
            name: "Home",
            to: "/Home", 
            icon: <AiFillHome></AiFillHome>
        }, 
        {
            name: "Comment",
            to: "/comment", 
            icon: <FaCommentDots></FaCommentDots>
        }, 
        {
            name: "Notification",
            to: "/notification", 
            icon: <AiFillBell></AiFillBell>
        }, 
        {
            name: "Settings",
            to: "/settings", 
            icon: <AiFillSetting></AiFillSetting>
        }
    ]
            
    
    const user = useSelector( ( state ) => state.user.userInfo )
    const storageRef = ref(storage, (user ? user.uid : ''));

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                navigate("/")
            }, 2000)
            toast.success("Sign Out")
            localStorage.removeItem("user")
            dispatch(setUser(null))
        })
    }

    const handleUpload = (e) => {
        e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    }

      const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      
      const message = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message, 'data_url').then((snapshot) => {
            console.log( 'Uploaded a data_url string!' );
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log( 'File available at', downloadURL );
                updateProfile(auth.currentUser, {
                photoURL: downloadURL
                }).then(() => {
                    toast.success( "Profile Picture Updated" )
                    setShowModal( false )
                    dispatch(setUser({
                        ...user,
                        photoURL: downloadURL
                    } ) )
                    localStorage.setItem( "user", JSON.stringify( {
                        ...user,
                        photoURL: downloadURL
                    } ) )
                    setImage("")
                }).catch((error) => {
                    toast.error(error.message)
                });
            });
        });
    }
    };
    
    return (
    <React.Fragment>
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
            theme="colored"
        />
        {showModal && <ModalProfileUpdate getCropData={getCropData} image={image} cropperRef={cropperRef} onChange={handleUpload} onClick={() => setShowModal(false)}></ModalProfileUpdate>}
        <div className="h-screen">
            <nav className="bg-thirty h-[10%]  md:px-24 px-3 flex items-center justify-between">
              <div>
                <Link to="/home"><img src={logo} className="w-36 inline-block" /></Link>
              </div>

              <div className="flex items-center ">
                  {screen.width > 768 ? <div><h3 className="text-xl text-white mr-6">{user?.displayName}</h3></div> : null}
                  <div className="relative w-16 h-full group cursor-pointer">
                  <img src={user?.photoURL ? user?.photoURL : demoImg} className="w-16 inline-block rounded-full" />
                  <span  className={`absolute  w-3 h-3 rounded-full bottom-1 right-0 z-10 ` +  (online ? "bg-green-500" : "bg-red-500")} ></span>
                  <div onClick={() => setShowModal(true)} className="absolute top-0 left-0 grid place-content-center w-16  h-full bg-[rgba(0,0,0,0.5)] rounded-full opacity-0 group-hover:opacity-100 transform transition-all duration-200">
                      <RiUploadCloudFill className="text-white text-xl"></RiUploadCloudFill>
                  </div>
              </div>
              </div>
            </nav>
            <div className="h-[90%] flex">
                <div className="relative h-full bg-primary flex flex-col justify-between pb-4 transition-all duration-200">
                    <span onClick={() => setShowSidebar(!showSidebar)} className="absolute right-0 text-4xl text-white top-1/2 -translate-y-1/2">{showSidebar ? <BsChevronBarLeft></BsChevronBarLeft> : <BsChevronBarRight></BsChevronBarRight>}</span>
                    <div>
                        <ul className="px-6 pt-6">
                        {
                        menuDatas.map((item, index ) => {
                            return <li className="" key={index}><Link className="text-white active:scale-95 hover:text-[rgba(255,255,255,0.7)] flex items-center py-2 gap-x-4 text-2xl" to={item.to}>{item.icon}{showSidebar && item.name}</Link></li>
                        })
                        }
                        </ul>
                    </div>
                    <div className="px-6">
                        <h2 onClick={handleSignOut} className="text-white flex items-center py-2 gap-x-4 text-2xl active:scale-95 hover:text-[rgba(255,255,255,0.7)] cursor-pointer"><VscSignOut></VscSignOut>{showSidebar && "Sign Out"}</h2>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Home