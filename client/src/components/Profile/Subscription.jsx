import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import SelectSubscription from '../Auth/SelectSubscription'

const Subscription = () => {

    let params = useParams()
    const sub = params.tier;
    const [subscription, setSubscription] = useState(sub)
    return (
        <div className='my-12'>
            <SelectSubscription selected={subscription} setSelected={(value) =>
                setSubscription(value)
            } />
        </div>
    )
}

export default Subscription