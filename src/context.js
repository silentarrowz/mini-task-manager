import React, {useState, useEffect } from 'react';
import { getUserList, getTaskList } from './api-calls';

const AppContext = React.createContext([{}, () => {}, () => {}]);

const AppProvider = (props) => {
  const [state, setState] = useState({
    priority:{
      "1":"Low",
      "2":"Medium",
      "3":"High"
    },  
    taskObj:{},  
    tasks:[],
    action:'',
  }); 

  const convertToObj = (list) => {
    const obj = {};
    list.map((item)=>{
        obj[item.id] = item;
    });
    return obj;
  }  
  
  useEffect(()=>{
    getUserList()
    .then((res)=>{
        const userObj = convertToObj(res);
        setState(state => ({ ...state, users:res, userObj }));            
    })
    .catch((err) => console.log(err));

    getTaskList()
    .then((res)=>{
        const taskObj = convertToObj(res);
        setState(state => ({ ...state, tasks: res, taskObj }));
    })
    .catch((err)=>console.log('error : ',err));  
  },[]);

  const getUpdatedTasks = async () => {
    const result = await getTaskList();    
    const taskObj = convertToObj(result);
    setState(state => ({ ...state, tasks: result, taskObj }));
  }

  return(
    <AppContext.Provider value={[state, setState, getUpdatedTasks]}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };