import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useCreateTeamMutation } from '../../features/team/teamApi';
import Error from '../../utils/Error'

const CreateTeamModal = ({ opened, control }) => {
    const { user: loggedInUser } = useSelector(state => state.auth);
    const [createTeam, { isLoading, isError, error, isSuccess }] = useCreateTeamMutation()

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' }).slice(0, 3);

    const [teamName, setTeamName] = useState('');
    const [descriptions, setDescriptions] = useState('');
    const [teamColor, setTeamColor] = useState('');
    const createOn = day + ' ' + month;
    const stage = 'backlog';
    const createdBy = loggedInUser



    const handleSubmit = (e) => {
        e.preventDefault();

        const teamData = {
            teamName:teamName.toUpperCase(),
            teamColor,
            descriptions,
            stage,
            createdBy,
            createOn,
            teamMembers: [{id:5,name:"sohag",email:"sohag@gmail.com"}]
        }
        createTeam(teamData)
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success('Team Created Successfully!');
            control()

        }
    },[isSuccess,control])


    return (
        <div>
            <div
                onClick={control}
                className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
            ></div>

            <div className="rounded w-[400px] lg:w-[600px] space-y-2 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-center text-2xl font-semibold text-gray-700">
                    Create Team
                </h2><hr />
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Team Name
                            </label>
                            <input

                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team Name"
                                value={teamName}
                                onChange={e => setTeamName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Team Color
                            </label>

                            <select

                                onChange={e => setTeamColor(e.target.value)}
                                required
                                className="select select-bordered  appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm">
                                <option disabled selected>Select Team Color</option>
                                <option value={'green'}>Green (Dev team)</option>
                                <option value={'red'}>Red (Frontend Team)</option>
                                <option value={'pink'}>Pink (Design Team)</option>
                                <option value={'orange'}>Orange (SQA Team)</option>
                                <option value={'blue'}>Blue (Backend Team)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="descriptions" className="sr-only">
                                Descriptions
                            </label>
                            <textarea
                                id="descriptions"
                                name="descriptions"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Descriptions..."
                                value={descriptions}
                                onChange={e => setDescriptions(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button

                            type="submit"
                            className={`group relative w-full flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 btn btn-sm normal-case ${isLoading && 'loading'} `}
                        >
                            {isLoading ? 'Loading' : 'Create Team'}
                        </button>
                    </div>

                    {
                        isError && <Error message={error} />
                    }
                </form>
            </div>

        </div>
    );
};

export default CreateTeamModal;