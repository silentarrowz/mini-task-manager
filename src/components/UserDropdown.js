import React, {useState} from 'react';
import styled from 'styled-components';

const UserDropDown = () => {
  const [user, setUser] = useState('');
  return (
    <Styld.Select name="cars" onChange={(e)=>setUser(e.target.value)}>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </Styld.Select>
  );
}

const Styld = {
  Select: styled.select`
    width: 200px;
    padding: 10px;
    border-radius: 5px;
  `,
}

export default UserDropDown;