import React, { useState } from 'react'
import { NavbarLinks } from "../data/NavbarLinks"
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FaRegBookmark } from "react-icons/fa";
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { IoIosArrowDropdown } from "react-icons/io";

import { logout } from "../services/operations/authAPI"

const Header = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const tags = useSelector((state) => state.tags.tags)
    // console.log("Tags in header  are ", tags.map(tag => tag.name).join(", "));

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log("token is", token);
    // console.log("user is", user);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    //sticky top-0 z-10
    return (
        <div className='flex h-16 items-center justify-center border-b border-richblack-50  bg-white'>
            <div className='flex items-center justify-center'>
                <div className='flex gap-4 items-center'>
                    <Link to="/" className='text-2xl font-semibold text-gray-800'>
                    <h2 className='font-Heading tracking-widest font-bold text-4xl'>StoryScape</h2>
                    </Link>
                    <div className='relative hidden sm:flex'>
                        <input
                            type="text"
                            placeholder='Search'
                            className='py-1 px-2 border border-richblack-25 rounded-full focus:outline-none focus:border-richblack-400'
                        />
                        <button className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                            <svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className='h-5 w-5'
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6M9 2a7 7 0 110 14 7 7 0 010-14z"
                                />
                            </svg>
                        </button>
                    </div>

                </div>

                <div>
                    <div className="flex sticky top-16 py-4 bg-white">
                        <ul className='flex gap-16 px-40'>
                            {
                                NavbarLinks.map((link, index) => (
                                    <li key="index"

                                    >
                                        {
                                            link.title === "Tags" ? (
                                                <div className='flex items-center gap-2'
                                                    onMouseEnter={() => setIsDropdownVisible(true)}
                                                    onMouseLeave={() => setIsDropdownVisible(false)}>
                                                    {link.title}
                                                    <IoIosArrowDropdown />
                                                    <div
                                                        className={` absolute gap-x-8 gap-y-8 text-xl left-[50%] transform -translate-x-1/2 top-12 flex flex-col rounded-3xl bg-richblack-50 p-4 text-richblack-900 ${isDropdownVisible ? 'visible opacity-100 z-100' : 'invisible opacity-50'} transition-all duration-200 lg:w-[300px]`}
                                                        onMouseEnter={() => setIsDropdownVisible(true)}
                                                        onMouseLeave={() => setIsDropdownVisible(false)}
                                                        style={{ zIndex: 100 }} // Set a high z-index value
                                                    >
                                                        <div className='absolute left-[45%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-50'></div>

                                                        {tags.length ? (
                                                            tags.map((tags, index) => (
                                                                <Link to={`/tags/${tags._id}`} key={index}>
                                                                    <div className='gap-16'>
                                                                        <p>{tags.name}</p>
                                                                    </div>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <div>Noth</div>
                                                        )}
                                                    </div>

                                                </div>
                                            ) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-black  border-b" : "text-richblack-200"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>


                {/* Write a blog / Saved Posts /Signup/ Login / dashboard*/}
                <div className='flex gap-8 items-center'>
                    <Link to="editor" className='p-1'>
                        <p className='py-[10px] px-[12px] hover:bg-richblack-50 hover:text-richblack-600 hover:cursor-pointer rounded-2xl'>
                            Write
                        </p>
                    </Link>
                    {
                        token !== null && (
                            <div className='flex gap-3 items-center'>
                                <Link to="/saved" className='relative'>
                                    <FaRegBookmark />
                                </Link>
                                <div
                                    onClick={() => {
                                        dispatch(logout(navigate))
                                    }}
                                    className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-black hover:bg-richblack-50 hover:text-richblack-600 hover:cursor-pointer rounded-2xl"
                                >
                                    <VscSignOut className="text-lg" />
                                    Logout
                                </div>
                                <div>
                                    <Link to="Profile">
                                        <img
                                            src={user?.image}
                                            alt={`profile-${user?.firstName}`}
                                            className="aspect-square w-[60px] rounded-full object-cover"
                                        />
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    {
                        token === null && (
                            <div className='flex gap-2'>
                                <Link to="login" className='border border-richblack-100 rounded-2xl px-2 py-1'>
                                    <p>Login</p>
                                </Link>
                                <Link to="signup" className='border border-richblack-100 rounded-2xl px-1 py-1'>
                                    <p>Sign Up</p>
                                </Link>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Header