"use client"
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

interface Video {
  id: number;
  title: string;
  url: string;
  loveIcon: string;
  shareIcon: string;
}

interface Module {
  title: string;
  videos: Video[];
}

interface Instructor {
  name: string;
  image:string;
  rating: number;
  type: string;
  blackBelt: boolean;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  image: string;
  instructor: Instructor;
  modules: Module[];
}

const VideoPlayer = () => {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course[]>(
          "https://course-server-theta.vercel.app/Courses"
        );
        // Assuming you want to display the first course's videos
        if (response.data.length > 0) {
          setCourse(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, []);
  console.log(course);
  

    return (
        <div>
                <div className=" ">
      {course && (
        <div className="bg-white lg:col-span-2 grid lg:grid-cols-6 
        xl:grid-cols-6 2xl:grid-cols-6  justify-between rounded-lg overflow-hidden shadow-md">
          <div className=" col-span-4 h-fit">
          <Image
            className="w-full h-full "
            src={course.image}
            width={300}
            height={200}
            alt=""
          />
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-3 items-center">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </p>
                <p className="text-gray-200">12K Views</p>
              </div>
              <div className="flex gap-5 mr-9 text-2xl">
              <FaRegHeart />
                <IoShareSocial />
              </div>
            </div>
          <div className="px-4 bg-gray-200">
            <p className="text-sm text-gray-500">{course.description}</p>
            <p>Instructor Information</p>
            <div className="  first-letter flex gap-10">
              <div>
                <Image
                  className=" h-full"
                  src={'/logo.png'}
                  width={100}
                  height={200}
                  alt="VectorStock"
                />
              </div>
              <div className="">
                <p>Name: {course.instructor.name}</p>
                <p>Rating: {course.instructor.rating}</p>
                <p>Type: {course.instructor.type}</p>
                <p>Black Belt: {course.instructor.blackBelt.toString()}</p>
              </div>
            </div>
          </div>
          </div>
          
     <div className="w-80  border-red-900">
     {course.modules.map((module, index) => (
            <div key={index} className="mt-4 w-80">
              {/* <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3> */}
              <div className="w-80 mt-2">
                {module.videos.map((video, idx) => (
                  <div key={idx} className="flex items-center gap-5">
                    <Image
                  className=" h-full"
                  src={'/logo.png'}
                  width={100}
                  height={200}
                  alt="VectorStock"
                />
                    <h4 className="text-md font-medium text-gray-600">{video.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
     </div>
        </div>
      )}
    </div>
       
        </div>
    );
};

export default VideoPlayer;
