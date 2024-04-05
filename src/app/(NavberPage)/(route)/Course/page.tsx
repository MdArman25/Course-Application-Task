
import AllCourses from '@/Pages/Courses/page';
import VideoPlayer from '@/components/(Course)/VideoSection/Page';
import React from 'react';

const Course = () => {
    return (
        <div className='max-w-5xl lg:ml-20 grid gap-20 bg-slate-100 bg-opacity-100'>
            <VideoPlayer></VideoPlayer>
       <AllCourses></AllCourses>
        
        </div>
    );
};

export default Course;