import React, { useState, useContext } from 'react';
import { List, Modal } from 'antd';
import Pill from './Pill';
import TaskForm from './TaskForm';
import { AppContext } from '../context';
import { getTaskList } from '../api-calls';
import Avatar from './Avatar';
import styled from 'styled-components';

const TaskList = () => {
  const [state, setState, getUpdatedTasks] = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setEditItem] = useState('');
  
  const editClicked = (item) => {
    setShowModal(true);
    setEditItem(item);
  } 

  return(   
    <>
    <List
      size="small"
      header={<div>Task List</div>}      
      bordered
      dataSource={state.tasks}
      renderItem={item => {
        return(      
        <List.Item >
          <Styld.Wrapper>
          <div>
            {item.message}
            <span style={{marginLeft:'10px'}}>{item.priority && <Pill priority={item.priority} />}</span>
          </div>
          <ActionStyles>
            <Styld.Button onClick={()=>editClicked(item)} >Edit</Styld.Button>
            <Styld.Button>Delete</Styld.Button>
          </ActionStyles>
          {item.assigned_to && state.userObj && state.userObj[Number(item.assigned_to)] && <Avatar user={state.userObj[Number(item.assigned_to)]} />}
          </Styld.Wrapper>          
        </List.Item>
        )}}
      /> 
      <Modal
        title="Update Task"
        visible={showModal}      
        onCancel={()=>setShowModal(false)}        
        footer={false}
      >
        <TaskForm 
          item={itemToEdit}
          onCancel={()=>setShowModal(false)}        
        />
      </Modal>
      </>     
  );
}

const ActionStyles = styled.div`
  display: none;
`;

const Styld = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    &:hover{
      ${ActionStyles}{
        width: 90px;
        display: flex;
        justify-content: space-between;
      }
    }
  `,
  Button: styled.button`
    height: 20px;
    font-size: 10px;
    border: 1px solid gainsboro;
    background-color: white;
    border-radius: 5px;
  `,
}


export default TaskList;