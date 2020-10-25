import React, {useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Modal, Popconfirm, message } from 'antd';
import {
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import TaskForm from './TaskForm';
import Avatar from './Avatar';
import Pill from './Pill';
import { AppContext } from '../context';
import { deleteTask } from '../api-calls';
import { DATE_FORMAT, SHORT_DATE } from '../constants';

const TaskCard = ({item}) => {
  const [state, setState, getUpdatedTasks] = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  
  const onConfirm = () => {
    const formData = new FormData();
    formData.append('taskid',item.id);
    deleteTask(formData)
    .then((res)=>{
      if(res === 'success'){
        message.success('Task Deleted Successfully!');
        setState(state =>({...state, action: 'delete'}));
        getUpdatedTasks();

      }else{
        message.error('There was an error!');
      }
    });
  }

  const onCancel = () => {
    console.log('clicked cancel')
  }

  return (
    <>
    <Styld.Container >
      <Styld.TitleWrapper>
        <Styld.Title>
          {item.message}
        </Styld.Title>       
        <ActnBtnsWrapper>
          <EditTwoTone onClick={()=>setShowModal(true)} />
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        </ActnBtnsWrapper>       
      </Styld.TitleWrapper>  
      <div style={{textAlign:'left'}}>
        {item.priority && <Pill priority={item.priority} />}
      </div>
      <Styld.Info>
        <Styld.TaskId>{item.id}</Styld.TaskId>
        {item.due_date && <Styld.Time>Due Date: {moment(item.due_date).format(SHORT_DATE)}</Styld.Time>}
        {state.userObj && state.userObj[Number(item.assigned_to)] && <Avatar user={state.userObj[Number(item.assigned_to)]} />}        
      </Styld.Info>
    </Styld.Container>
    
      
    <Modal
      title="Update Task"
      visible={showModal}      
      onCancel={()=>setShowModal(false)}        
      footer={false}
    >
      <TaskForm 
        item={item}
        onCancel={()=>setShowModal(false)}        
      />
    </Modal>
  </>
  );
};

const ActnBtnsWrapper = styled.div`
  width: 43px;
  display: flex;
  justify-content: space-between;  
`;

const Styld = {
  Container: styled.div`
    border-radius: 5px;
    max-width: 320px;
    min-width: 320px;
    box-shadow: 0px 1px 6px grey;
    padding: 10px;
    margin-bottom: 20px;
    &:hover{
      background-color: aliceblue;
    }
  `,  
  TitleWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Title: styled.div`
    color: #6d827c;
    font-size: 18px;
    font-weight: bold;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Info: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  Time: styled.span`
    margin-top: 5px;
  `,
  TaskId: styled.div`
    padding-top: 5px;
    color: #7A869A;
  `,
  EditBtn: styled.button`
    background-color: white;
    border: 1px solid gainsboro;
    border-radius: 7px;
    cursor: pointer;
  `,
}

export default TaskCard;