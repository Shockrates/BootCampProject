
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const TimeAgo = ({ createdAt }) => {
    const [text, setText] = useState('');

  useEffect(() => {
    const update = () => setText(formatDistanceToNow(new Date(createdAt), { addSuffix: true }).replace('about ', ''));
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);
  return <span>{text}</span>;
}

export default TimeAgo