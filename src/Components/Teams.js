import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../features/team/teamApi';
import Error from '../utils/Error';
import TeamCardLoader from '../utils/TeamCardLoader';
import AddMemberModal from './Modals/AddMemberModal';
import CreateTeamModal from './Modals/CreateTeamModal';
import Navbar from './Navbar';
import Team from './Team';

const Teams = () => {
    const [opened, setOpened] = useState(false);
    const [addMemberModalOpened, setAddMemberModalOpened] = useState(false);
    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };
    const controlAddMemberModal = () => {
        setAddMemberModalOpened((prevState) => !prevState);
    };
    

    const handleCreateTeamModal = ()=>{
        setOpened(true)
    }
    const {user}=useSelector(state=>state.auth);

    const {data:teams,isLoading,isError,error,isSuccess}= useGetTeamsQuery(user?.email);

    // decide what to render
    let content = null;
    if(isLoading) content = <><TeamCardLoader/><TeamCardLoader/><TeamCardLoader/></>
    if(!isLoading && isError) content = <Error message={error}/>
    if(!isLoading && !isError && teams?.length===0) content = <Error message="No team found"/>
    if(!isLoading && !isError && teams?.length>0) content = teams.map(team=><Team 
    key={team.id} team={team} openModal={setAddMemberModalOpened} />)

    
    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <Navbar />

            <div className="px-10 mt-6 flex justify-between">
                <h1 className="text-2xl font-bold">Teams</h1>
                <button
                    onClick={handleCreateTeamModal}
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto" >
                {content}
                
            </div>
            {
                opened && <CreateTeamModal  open={opened} control={controlModal}/>

            }
            {
                addMemberModalOpened && <AddMemberModal addModalControl={controlAddMemberModal}/>
            }
        </div>
    );
};

export default Teams;