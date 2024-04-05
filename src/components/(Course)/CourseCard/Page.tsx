import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"; // Import star icons for rating

interface Instructor {
  name: string;
  rating: number;
  type: string;
  blackBelt: boolean;
}

export interface CourseCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  instructor: Instructor;
  Purchased: string;
}
// type declare
const CourseCard: React.FC<CourseCardProps> = ({
  image,
  title,
  price,
  rating,
  instructor,
  Purchased,
}) => {
  // Function to render star icons based on the rating value
  const renderRatingStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    // Iterate to render each star
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<BsStarFill key={i} className="text-yellow-400" />);
      } else if (i === roundedRating + 0.5) {
        stars.push(<BsStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<BsStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image
        src={image}
        alt="imgbb"
        height={200}
        width={250}
        className="w-full h-40 object-cover rounded-xl border-2 shadow-sm"
      />
      <div className="p-5">
        <div className="flex justify-between items-center pb-6">
          <div className="flex gap-3 items-center">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {instructor.name}
            </p>
          </div>

          <div className="">
            {Purchased === "true" ? (
              <div className=" flex  gap-3 text-2xl ">
                <FaRegHeart />
                <IoShareSocial />
              </div>
            ) : (
              <div className="flex  gap-3 text-2xl">
                <FaRegHeart />
                <IoShareSocial />
                <FaShoppingCart />
              </div>
            )}
          </div>
        </div>
        <div className="w-5/6 ">
          <p className="text-lg font-semibold">{title}</p>
          <div className="flex items-center">
            {renderRatingStars()} {/* Render rating stars */}
            <p className="text-lg font-semibold ml-2">{rating}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-lg font-semibold text-center">
          {Purchased === "true" ? (
            <p>Purchased</p>
          ) : (
            <div className="flex justify-between w-full ">
              <p className="text-xl font-bold pt-2">BDT. {price}</p>
              <p className="flex items-center gap-1  ">
                <FaShoppingCart className="relative left-8 text-lg" />
                <Button
                  className="bg-amber-400 rounded-3xl text-lg px-8"
                  variant={"outline"}
                >
                  Buy Now
                </Button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
