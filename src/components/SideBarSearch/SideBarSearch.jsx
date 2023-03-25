import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BACKEND_URL } from '../../constant'
import useDebounce from '../../hooks/useDebounce'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import Loading from '../Loading'

export default function SideBarSearch({setCurrentUser}) {
    let [input, setInput] = useState('')
    let [result, setResult] = useState([])
    let [showResult, setShowResult] = useState(false)
    let [loading, setLoading] = useState(false)
    const searchRef = useRef(null)
    const debouncedValue = useDebounce(input, 1000)
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }
    const clickUserHandler = (user) => {
        setShowResult(false)
        setCurrentUser(user)
    }
    const fetchResult = async () => {
        if(!debouncedValue || loading) return;
        setLoading(true)
        let response = await axios.post(BACKEND_URL + "/find", {email: debouncedValue })
        let data = response.data
        setResult(data.users)
        setLoading(false)
        setShowResult(true)
    }

    useOnClickOutside(searchRef, ()=> setShowResult(false))

    useEffect(() => {
        fetchResult()
    }, [debouncedValue])

    return (
        <div className="w-full h-[50px] flex items-center justify-center relative" ref={searchRef}>
            <div className="w-[90%] h-[40px] bg-gray-100 rounded-full flex items-center justify-center">
                <input type="text" className="w-[90%] h-[40px] bg-gray-100 rounded-full outline-none" placeholder="Search user by email" onChange={handleInputChange}/>
            </div>
            {showResult && 
                <div className='absolute top-[110%] left-0 right-0 bg-slate-100 shadow-xl'>
                    <div className='justify-center py-3'>
                        {loading && <Loading />}
                        {!loading && result.length == 0 && <p className='text-black-300 text-center'>No result</p>}
                        {!loading && result.length > 0 && result.map(user => 
                            <div key={user.email} onClick={()=>clickUserHandler(user)} className='w-full px-3 py-2 cursor-pointer hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-600 flex items-center'>
                                <div className='w-10 h-10 min-w-[40px]'>
                                    <img className='w-10 h-10 rounded-full object-cover' src={user.photoURL} alt="" />
                                </div>
                                <div className='ml-3'>
                                    <h3 className='font-semibold text-[14px] limit-text'>{user.displayName}</h3>
                                    <p className='text-gray-500 text-[12px] limit-text'>{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
