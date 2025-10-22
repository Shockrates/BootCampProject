import { useState } from 'react'
import FeedListItem from './FeedListItem'
import ReviewModal from '../../Review/ReviewModal';


const FeedList = ({ reviews }) => {

  const [isOpen, setIsOpen] = useState(false);

   function openModal() {
    setIsOpen(true);
  }

  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>


  return (

    <div>{
      /* Reads reviews */
      reviews.map((review, index) => (

        <FeedListItem review={review} index={index} onOpen={openModal}/>

      ))
    }
    <ReviewModal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
    </div>
  )
}

export default FeedList