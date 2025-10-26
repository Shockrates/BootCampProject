import { useState } from 'react'
import FeedListItem from './FeedListItem'
import ReviewModal from '../Review/ReviewModal';
import { useAuth } from '../Auth/AuthProvider'

const FeedList = ({ reviews }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState({});
  const { user } = useAuth();


  function openModal(selectedReview) {
    setReview(selectedReview)
    setIsOpen(true);
  }

  function closeModal() {
    setReview({});
    setIsOpen(false)
  }



  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>


  return (

    <div>{
      /* Reads reviews */
      reviews.map((review, index) => (

        <FeedListItem key={index} review={review} onOpen={openModal} />

      ))
    }
      <ReviewModal
        isOpen={isOpen}
        onClose={closeModal}
        review={review}
        user={review.userId}
        authUser={user}
      />
    </div>
  )
}

export default FeedList