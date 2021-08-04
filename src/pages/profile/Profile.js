import React, { useState, useEffect } from 'react';
import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/users?username=${username}`);
      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    };

    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src={user.coverPicture || '/assets/brand.png'}
                alt=''
                className='profileCoverImg'
              />
              <img
                src={
                  user.dpImage
                    ? `/posts/file/${user.dpImage}`
                    : `/assets/persons/${
                        user.gender === 'Female'
                          ? 'noAvatarFemale.png'
                          : 'noAvatar.jpg'
                      }`
                }
                alt='dp'
                className='profileUserImg'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>
                {user.firstName + ' ' + user.lastName}
              </h4>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
