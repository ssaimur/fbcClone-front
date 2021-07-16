import React, { useState } from 'react';
import { MoreVert } from '@material-ui/icons';
import './post.css';
import { Users } from '../../dummyData';

function Post({ post }) {
  const { desc, photo, date, userId, like, comment } = post;
  const user = Users.find((item) => item.id === userId);

  const [likes, setLikes] = useState(like);
  const [isLiked, setIsLiked] = useState(false);

  const likeCounter = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src={user.profilePicture}
              alt='person profile'
            />
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{date}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'>{desc}</span>
          <img src={photo} alt='this is my first post' className='postImg' />
        </div>

        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              src='/assets/like.png'
              alt=''
              className='likeIcon'
              onClick={likeCounter}
            />
            <span className='postLikeCounter'>{likes} people like it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
