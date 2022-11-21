import React from 'react'

const Follower = ({name, imageURL, profileURL}) => {
  return (
    <article className="card">

      <img src={imageURL}/>

      <h4>{name}</h4>

      <a className="btn" href={profileURL}>View profile</a>

    </article>
  );
}

export default Follower
