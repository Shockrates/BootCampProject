import React from 'react'
import { IoIosStar } from "react-icons/io";

const RatingIcon = ({rating}) => {
  return (
    <div className="flex flex-row gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <IoIosStar size={20} key={index} color='#D26D15' fill={index<rating? "gold" : "#AAB7B8"}/>
                    ))}
    
                  </div>
  )
}

export default RatingIcon