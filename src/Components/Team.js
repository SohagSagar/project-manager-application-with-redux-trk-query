import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDeleteTeamMutation } from '../features/team/teamApi';


const Team = ({ team,  openAddModal,openViewModal }) => {
    const { id,teamName, teamColor, descriptions, createOn } = team;
    const {user}=useSelector(state=>state.auth);
    const [deleteTeam,{isLoading,isSuccess,isError}] =useDeleteTeamMutation()

    const handleDelete = () =>{
        deleteTeam({
            id,
            email:user.email
        })
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success("Delete Successfull")
        }
    },[isSuccess])

    return (
        <div>
            
            <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">

                <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex  dropdown  dropdown-left dropdown-hover">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>

                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded w-40 font-">
                        <li onClick={()=>openViewModal(true,id)} className=' btn-sm mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700'>View Members</li>

                        <li onClick={() => openAddModal(true,id)} className=' btn-sm mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700'>Add Member</li>

                        <li onClick={handleDelete} className=' btn-sm mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700'>Delete Team</li>




                    </ul>
                </button>



                <span className={`flex items-center h-6 px-3 text-xs font-semibold text-${teamColor}-500 bg-${teamColor}-100 rounded-full`} >{teamName}</span  >

                <h4 className="mt-3 text-sm font-medium">
                    {descriptions}
                </h4>

                <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400" >
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"  >
                            <path
                                fill-rule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">{createOn}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Team;