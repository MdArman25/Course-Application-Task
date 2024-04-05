"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "@/components/(Course)/CourseCard/Page";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export interface Instructor {
  name: string;
  rating: number;
  type: string;
  blackBelt: boolean;
}

export interface CourseCardProps {
  _id: number;
  image: string;
  description: string;
  rating: number;
  price: number;
  title: string;
  instructor: Instructor;
  Purchased: string;
}

const AllCourses = () => {
  const [videos, setVideos] = useState<CourseCardProps[]>([]);
  const [purchasedVideos, setPurchasedVideos] = useState<CourseCardProps[]>([]);
  const [nonPurchasedVideos, setNonPurchasedVideos] = useState<CourseCardProps[]>([]);
  const [purchasedCurrentPage, setPurchasedCurrentPage] = useState(1);
  const [nonPurchasedCurrentPage, setNonPurchasedCurrentPage] = useState(1);
  const [videosPerPage] = useState(3);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<CourseCardProps[]>(
          `https://course-server-theta.vercel.app/Courses`
        );
        setVideos(response.data);
        
        // Filter purchased and non-purchased videos
        const purchased = response.data.filter((video) => video.Purchased === "true");
        setPurchasedVideos(purchased);
        
        const nonPurchased = response.data.filter((video) => video.Purchased !== "true");
        setNonPurchasedVideos(nonPurchased);
        console.log(response.data); // Log response data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    
    fetchVideos();
  }, []);

  // Get current purchased videos
  const indexOfLastPurchasedVideo = purchasedCurrentPage * videosPerPage;
  const indexOfFirstPurchasedVideo = indexOfLastPurchasedVideo - videosPerPage;
  const currentPurchasedVideos = purchasedVideos.slice(indexOfFirstPurchasedVideo, indexOfLastPurchasedVideo);

  // Get current non-purchased videos
  const indexOfLastNonPurchasedVideo = nonPurchasedCurrentPage * videosPerPage;
  const indexOfFirstNonPurchasedVideo = indexOfLastNonPurchasedVideo - videosPerPage;
  const currentNonPurchasedVideos = nonPurchasedVideos.slice(indexOfFirstNonPurchasedVideo, indexOfLastNonPurchasedVideo);

  // Change purchased page
  const paginatePurchased = (pageNumber: number) => setPurchasedCurrentPage(pageNumber);

  // Change non-purchased page
  const paginateNonPurchased = (pageNumber: number) => setNonPurchasedCurrentPage(pageNumber);

  // Previous page for purchased videos
  const prevPurchasedPage = () => {
    if (purchasedCurrentPage > 1) {
      setPurchasedCurrentPage(purchasedCurrentPage - 1);
    }
  };

  // Next page for purchased videos
  const nextPurchasedPage = () => {
    if (indexOfLastPurchasedVideo < purchasedVideos.length) {
      setPurchasedCurrentPage(purchasedCurrentPage + 1);
    }
  };

  // Previous page for non-purchased videos
  const prevNonPurchasedPage = () => {
    if (nonPurchasedCurrentPage > 1) {
      setNonPurchasedCurrentPage(nonPurchasedCurrentPage - 1);
    }
  };

  // Next page for non-purchased videos
  const nextNonPurchasedPage = () => {
    if (indexOfLastNonPurchasedVideo < nonPurchasedVideos.length) {
      setNonPurchasedCurrentPage(nonPurchasedCurrentPage + 1);
    }
  };

  return (
    <div>
    <div className="flex justify-between items-center mb-3 text-justify">
    <h1  className="text-blue-950 text-xl font-semibold">Purchased Courses</h1>
  {/* Pagination for purchased courses */}
  <ul className="flex justify-center items-center space-x-2 mt-4 mr-32">
        <li onClick={prevPurchasedPage}><MdOutlineKeyboardArrowLeft /></li>
        {Array.from({ length: Math.ceil(purchasedVideos.length / videosPerPage) }).map(
          (item, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                purchasedCurrentPage === index + 1 ? "font-bold rounded-full px-2 bg-amber-500 text-black" : ""
              }`}
              onClick={() => paginatePurchased(index + 1)}
            >
              {index + 1}
            </li>
          )
        )}
        <li onClick={nextPurchasedPage}><MdOutlineKeyboardArrowRight /></li>
      </ul>

    </div>
      <hr className="text-xl text-black border-2" />
      <br />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-6">
        {/* Map over the purchased videos array and render CourseCard for each video */}
        {currentPurchasedVideos.map((video) => (
          <div key={video._id}>
            <CourseCard
              rating={video.rating}
              price={video.price}
              image={video.image}
              title={video.title}
              instructor={video.instructor}
              Purchased="true"
            />
          </div>
        ))}
      </div>
    
      <h1 className="text-blue-950 text-xl font-semibold mt-20" >All Courses</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-6">
        {/* Map over the non-purchased videos array and render CourseCard for each video */}
        {currentNonPurchasedVideos.map((video) => (
          <div key={video._id}>
            <CourseCard
              price={video.price}
              rating={video.rating}
              image={video.image}
              title={video.title}
              instructor={video.instructor}
              Purchased="false"
            />
          </div>
        ))}
      </div>
      {/* Pagination for non-purchased courses */}
      <ul className="flex justify-center items-center space-x-2 mt-4">
        <li onClick={prevNonPurchasedPage}><MdOutlineKeyboardArrowLeft /></li>
        {Array.from({ length: Math.ceil(nonPurchasedVideos.length / videosPerPage) }).map(
          (item, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                nonPurchasedCurrentPage === index + 1 ? "font-bold rounded-full px-2 bg-amber-500 text-black" : ""
              }`}
              onClick={() => paginateNonPurchased(index + 1)}
            >
              {index + 1}
            </li>
          )
        )}
        <li onClick={nextNonPurchasedPage}><MdOutlineKeyboardArrowRight /></li>
      </ul>
    </div>
  );
};

export default AllCourses;
