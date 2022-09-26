import React from 'react';
import Navbar from './Navbar';
import Backlog from './ProjectsStages.js/Stages/Backlog';
import Blocked from './ProjectsStages.js/Stages/Blocked';
import Doing from './ProjectsStages.js/Stages/Doing';
import Done from './ProjectsStages.js/Stages/Done';
import Ready from './ProjectsStages.js/Stages/Ready';
import Review from './ProjectsStages.js/Stages/Review';


const Projects = () => {
    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200" >
            <Navbar />

            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>


            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <Backlog />

                <Ready />

                <Doing />

                <Review />

                <Blocked />

                <Done />

                <div className="flex-shrink-0 w-6"></div>
            </div>
        </div>
    );
};

export default Projects;