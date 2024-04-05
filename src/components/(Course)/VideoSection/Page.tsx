"use client"
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
                <div>
      {course && (
        <div className="bg-white lg:col-span-2 rounded-lg overflow-hidden shadow-md">
          <Image
            className="border-2 h-full"
            src={course.image}
            width={100}
            height={200}
            alt=""
          />
          <div className="p-4">
            <div className="flex justify-between items-center pb-6">
              <div className="flex gap-3 items-center">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {course.title}
                </p>
                <p className="text-gray-200">Views</p>
              </div>
              <div className="flex gap-5">
                <p>React Icon</p>
                <p> Share Icon</p>
              </div>
            </div>
          </div>
          <div className="px-4 bg-gray-200">
            <p className="text-sm text-gray-500">{course.description}</p>
            <p>Instructor Information</p>
            <div className=" border-2 first-letter flex gap-10">
              <div>
                <Image
                  className="border-2 h-full"
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
          
          {course.modules.map((module, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {module.videos.map((video, idx) => (
                  <div key={idx}>
                    <h4 className="text-md font-medium text-gray-600">{video.title}</h4>
                    <video className="w-full" controls preload="none">
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
       
        </div>
    );
};

export default VideoPlayer;
