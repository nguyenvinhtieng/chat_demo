import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"
import { useContext } from "react";
import { GlobalState } from "../context";
import axios from "axios";
import { BACKEND_URL } from "../constant";

export default function Login() {
  const state = useContext(GlobalState);
  const signIn = async () => {
    try {
      let result = await signInWithPopup(auth, provider)
      let dataUser = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      }
      state.userAPI.userData[1](dataUser)
      await axios.post(BACKEND_URL + "/login", dataUser)
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <button 
        onClick={signIn}
        className="bg-white  text-gray-700 border-[1px] border-gray-200 py-2 px-4 rounded h-[50px] flex items-center gap-2 hover:bg-slate-100 transition-all">
        Login with Google
        <FcGoogle></FcGoogle>
      </button>
    </div>
  )
}
