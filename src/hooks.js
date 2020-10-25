import React, { useContext } from 'react';
import {getRequest, postRequest} from './utils/network-calls';
import { AppContext } from './context';

export const useFetchTaskList = async () => {
  const [state, setState] = useContext(AppContext);
  const result = await getRequest('https://devza.com/tests/tasks/list');
  if(result.data.status === 'success'){
    setState(state => ({...state, tasks: result.data.tasks}));    
  }else{
    console.log('error : ',result);
  }
};