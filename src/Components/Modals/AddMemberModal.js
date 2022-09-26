import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../features/team/teamApi';
import Error from '../../utils/Error';
import isValidEmail from '../../utils/isValidEmail'

const AddMemberModal = ({  addModalControl,openModal }) => {
    const [searchedEmail, setSearchedEmail] = useState('');
    const [querySlip, setQuerySkip] = useState(true);
    const {auth} =useSelector(state=>state.auth);

    const { data: searchedUser } = useGetUserQuery(searchedEmail, {
        skip: querySlip
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const debounch = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }
    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setSearchedEmail(value);
            setQuerySkip(false)
        }
    }
    const handleEmail = debounch(doSearch, 500);



    return (
        <div>
            <div
                onClick={addModalControl}
                className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
            ></div>
            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Send message
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="to" className="sr-only">
                                To
                            </label>
                            <input
                                id="to"
                                name="to"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Send to"
                                onChange={e => handleEmail(e.target.value)}
                            />
                        </div>

                    </div>

                    <div>
                        <button

                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Add Member
                        </button>
                    </div>
                    {
                        searchedUser?.length === 0 && <Error message="This user does not exit!" />
                    }
                    {
                        searchedUser?.length > 0 && auth?.email === searchedUser?.email && <Error message="You are already in the team!" />
                    }

                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;