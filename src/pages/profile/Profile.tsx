import React from 'react';
import ProfileHero from '../../components/profile/ProfileHero';
import Master from '../../components/layout/master/Master';
import ProfilePost from '../../components/profile/ProfilePost';

function Profile() {
  return (
    <Master>
      <ProfileHero />
      <ProfilePost />
    </Master>
  );
}

export default Profile;