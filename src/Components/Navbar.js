import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import logo from '../assets/logo.png'
import {  userLoggedOut } from '../features/auth/authSlice';

const Navbar = () => {
    const projectsPath = useMatch('/projects')
    const teamsPath = useMatch('/teams');
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(userLoggedOut());
        localStorage.clear();
        toast.success('Logout Successfull')
    }

    return (
        <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75" >

            <img alt='' src={logo} className="h-10 w-10" />

            {/* search input */}
            {
                projectsPath &&
                <input
                    className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                    type="search"
                    placeholder="Search for anything…"
                />

            }


            <div className="ml-10 ">
                <Link
                    to={'/projects'}
                    class={`mx-2 text-sm font-semibold ${projectsPath?.pathname ? 'text-indigo-700' : 'text-gray-600 hover:text-indigo-700'} `}>
                    Projects
                </Link>

                <Link
                    to={'/teams'}
                    class={`mx-2 text-sm font-semibold ${teamsPath?.pathname ? 'text-indigo-700' : 'text-gray-600 hover:text-indigo-700'} `}>
                    Team
                </Link>
            </div>


            <buton className="   w-8 h-8 ml-auto overflow-hidden rounded-full  " >
            </buton>
            
            {
                user && <div className='mr-2 font-semibold'>{user.name.slice()[0].toUpperCase()+user.name.slice(1)}</div>
            }
            

            <div className="dropdown dropdown-hover dropdown-end">
                {/* <label tabIndex={0} className="btn m-1">Hover</label> */}
                <div className='flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer'>

                    <img src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512" alt="" />
                </div>


                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded w-28 font-">
                    <li><Link
                        to={'/projects'}
                        className={` btn-sm mx-2 text-sm font-semibold ${projectsPath?.pathname ? 'text-indigo-700' : 'text-gray-600 hover:text-indigo-700'} `}
                    >Projects</Link></li>

                    <li ><Link
                        className={`btn-sm mx-2 text-sm font-semibold ${teamsPath?.pathname ? 'text-indigo-700' : 'text-gray-600 hover:text-indigo-700'} `}
                        to={'/teams'}
                    >Teams</Link></li>

                    <li onClick={handleLogout} className='mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700 cursor-pointer text-left btn btn-ghost btn-sm normal-case rounded-md'> Logout</li>
                </ul>
            </div>



        </div>
    );
};

export default Navbar;