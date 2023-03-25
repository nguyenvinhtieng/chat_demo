import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoLogOutOutline } from 'react-icons/io5'
import { FaFacebookF } from 'react-icons/fa'
import { auth } from '../../config/firebase'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { GlobalState } from '../../context';

export default function SideBarHead() {
  const state = useContext(GlobalState);
  const [user, setUser ] = state.userAPI.userData;
  const logOut = () => {
    Swal.fire({
      title: 'Are you sure want to logout?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonText: 'Save',
      denyButtonText: `Logout anyway`,
    }).then((result) => {
      if (result.isDenied) {
        auth.signOut()
        setUser(null)
      }
    })
  }


  return (
    <div className='flex items-center justify-between border-b-2 border-gray-200 py-5 px-3'>
      <div className='flex items-center cursor-pointer w-full'>
        <img className='w-10 h-10 rounded-full object-cover' src={user.photoURL} alt='avatar'/>
        <h1 className='ml-2 flex-1'>Hello { user.displayName }</h1>
        <div className="dropdown min-w-[30px] flex justify-center relative ">
          <BsThreeDotsVertical></BsThreeDotsVertical>
          <div className="dropdown__list absolute top-[110%] right-0 text-[12px] py-1 bg-gray-100 rounded-md opacity-0 pointer-events-none">
            <div className="px-4 hover:bg-blue-50 py-2 flex items-center">
              <span className='mr-2'>Facebook</span>
              <FaFacebookF></FaFacebookF>
            </div>
            <div className="px-4 hover:bg-red-50 py-2 flex items-center" onClick={logOut}>
              <span className='mr-2'>Logout</span>
              <IoLogOutOutline></IoLogOutOutline>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
