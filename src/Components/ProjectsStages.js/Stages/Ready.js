import React from 'react';
import ReadyList from '../ProjectsLIst/ReadyList';

const Ready = () => {
    return (
        <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">Ready</span>
                <span
                    className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                >3</span
                >
            </div>
            <div className="flex flex-col pb-2 overflow-auto">
               <ReadyList/>

            </div>
        </div>
    );
};

export default Ready;