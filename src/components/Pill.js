import React, { useEffect, useState} from 'react';
import { Tag } from 'antd';
import { PRIORITY } from '../constants';
import styled from 'styled-components';

const Pill = ({priority}) => {  
  const [color, setColor] = useState('');
  
  useEffect(()=>{
    setColors(priority);
  },[priority]);
  
  const setColors = (priority) => {
    if(priority == "3"){
      setColor('red');
    }else if(priority == "2"){
      setColor('warning');
    }else if(priority == "1"){
      setColor('processing');
    }
  }
  return <StyledTag color={color}  >{PRIORITY[priority]}</StyledTag>
}

const StyledTag= styled(Tag)`
    font-size: 15px;
    text-transform: capitalize;
  `;

export default Pill;