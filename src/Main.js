import React, { useState } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import Board from './components/Board';
import TaskList from './components/TaskList';

const { TabPane } = Tabs;
const Main = () => {
  const [tab, setTab] = useState('2'); 

  return (
    <>
    <StyledTab style={{width: '100%', padding:'30px'}} defaultActiveKey={tab} onChange={(key)=> setTab(key)}>
      <TabPane tab="List" key="1">
        <TaskList />
      </TabPane>
      <TabPane tab="Board" key="2">
        <Board/>
      </TabPane>        
    </StyledTab>
   
    </>
  );
}

const StyledTab = styled(Tabs)`
  width: 80%;
  padding: 30px;
`;

export default Main;