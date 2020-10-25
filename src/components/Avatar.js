import React from 'react';
import styled from 'styled-components';

const defaultColors = ['#2ecc71', '#3498db', '#8e44ad', '#e67e22', '#e74c3c', '#1abc9c', '#2c3e50'];

function generateNameInitials(name) {
  if (!name) return;

  let words = name.includes(' ') ? name.split(' ') : name;
  let initials = '';

  if (words.constructor !== Array) {
    initials = words[0].toUpperCase();
  } else {
    for (let i = 0; i < 2; i++) {
      initials += words[i].charAt(0).toUpperCase();
    }
  }

  return initials;
}


function generateStyles() {
  let index = Math.floor(Math.random() * 7);
  let bgColor = defaultColors[index];
  let styles = {
    backgroundColor: bgColor,
    color: '#fff',
  };
  return styles;
}


const Avatar = ({user}) => {
  return(
  <Styld.Rounded style={generateStyles()} >
    {user.picture?<Styld.Image src={user.picture} alt='avatar'/>: generateNameInitials(user.name)}
  </Styld.Rounded>
  );
}

const Styld = {
  Rounded: styled.div`
    width: 26px;
    height: 26px;
    font-size: 12px;
    display: flex;    
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    }
  `,
  Image: styled.img`
    width: 100%;
    border-radius: 25px;
  `,
}

export default Avatar;