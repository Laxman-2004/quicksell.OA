import React from 'react';
import './Card.css';  // Import styles from Card.css file

const Card = ({ id, title, tag, status, priority }) => {
  const group = localStorage.getItem('group');  // Get the current grouping from localStorage

  return (
    <div className="cardContainer">   {/* Main container for the card */}
      <div className="cardHeading">      {/* Container for card heading */}
        <span style={{ textTransform: 'uppercase' }} className='color-grey'>{id}</span>
        {group !== 'user' && (  // Only display user image if group is not 'user'
          <div className="imageContainer relative" style={{ width: '20px', height: '20px' }}>
            <img
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              src="https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"
              alt="UserImage"
            />
            <div className={`${status && 'online'} showStatus`} />  {/* Conditional class for online status */}
          </div>
        )}
      </div>
      <div className="cardTitle" style={{ fontWeight: 200 }}>  {/* Container for card title */}
        <p>{title}</p>
      </div>
      <div className="cardTags">          {/* Container for card tags */}
        {group !== 'priority' && (  // Only display priority tag if group is not 'priority'
          <div className="tags color-grey">
            {priority && <img src={priority} alt="" />}  {/* Display priority image if priority is provided */}
          </div>
        )}
        {tag?.map((elem, index) => (  // Loop through each tag and display them
          <div key={index} className="tags color-grey">
            <span>•</span> {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;