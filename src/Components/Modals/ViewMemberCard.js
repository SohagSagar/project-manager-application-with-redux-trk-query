import gravatarUrl from 'gravatar-url';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ViewMemberCard = ({member}) => {
    const {email,name} = member;
    const {user} = useSelector(state=>state.auth);

    const [isCreator,setIsCreator]=useState(false)
    if(user.email===email) setIsCreator(true)


    return (

        <div className='flex justify-center items-center flex-col mt-3 border w-28 h-36 rounded border-gray-100'>
            <div className="avatar">
                <div className={`w-12 rounded-full ${isCreator && 'ring ring-primary ring-offset-1'} `}>
                    <img alt='' src={gravatarUrl(email)} />
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-sm mt-2'>{name}</h2>
            </div>
        </div>

    );
};

export default ViewMemberCard;