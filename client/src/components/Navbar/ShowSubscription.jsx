import React from 'react'
import { Link } from 'react-router-dom'
import free from '../../assets/free.png'
import diamond from '../../assets/diamond.png'
import gold from '../../assets/gold.png'

const ShowSubscription = ({ subscription }) => {
    let src = free, label = free, subscriptionText = "Free Tier";
    switch (subscription) {
        case "gold":
            src = gold;
            label = gold;
            subscriptionText = "Gold Tier"
            break;
        case "diamond":
            src = diamond;
            label = diamond;
            subscriptionText = "Diamond Tier"
            break;
        default:
            break;
    }

    return (
        <Link to={`/subscription/${subscription}`}>

            <div className="flex flex-row items-center gap-2">
                <img
                    src={src}
                    alt={label}
                    title={subscriptionText}
                    className="w-12 h-12 object-cover"
                />
                {/* <span>{subscriptionText}</span> */}
            </div>
        </Link>


    )
}

export default ShowSubscription