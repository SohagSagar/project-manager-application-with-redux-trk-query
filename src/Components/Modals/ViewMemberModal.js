import React from 'react';
import cancelbtn from '../../assets/cancel.png'
import { useGetTeamQuery } from '../../features/team/teamApi';
import Error from '../../utils/Error';
import ViewMemberCard from './ViewMemberCard';

const ViewMemberModal = ({ closeViewModal, id }) => {
    const { data: team, isLoading, isError } = useGetTeamQuery(id)
    console.log(team);

    // decide what to render
    let content = null;
    let teamName = null;
    let teamLength = null;
    if (isLoading) content = <div>Loading...</div>
    if (!isLoading && isError) content = <Error message='There was an error' />
    if (!isLoading && !isError && team[0]?.teamMembers?.length === 0) content = <Error message='No Member found' />
    if (!isLoading && !isError && team[0]?.teamMembers?.length) teamLength = team[0]?.teamMembers?.length;
    if (!isLoading && !isError && team[0]) teamName = team[0]?.teamName;
    if (!isLoading && !isError && team[0]?.teamMembers?.length > 0) content = team[0]?.teamMembers.map(member => <ViewMemberCard key={member.id} member={member} />)
    return (
        <div>
            <div className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer" ></div>


            <div className="rounded w-[400px] lg:w-[600px] bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                <div className='flex justify-end cursor-pointer' onClick={() => closeViewModal()}>
                    <img className='w-6 h-6' src={cancelbtn} alt="" srcset="" />
                </div>
                <h3 className='text-center font-semibold mb-3'>Team:{teamName} [{teamLength}]</h3><hr />
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-5'>

                    {content}
                </div>
            </div>
        </div >
    );
};

export default ViewMemberModal;