import {getRequest, postRequest} from '../utils/network-calls';
const apiUrl = process.env.REACT_APP_API_URL;

export const getTaskList = async () => {
  const result = await getRequest(`${apiUrl}/tasks/list`);
  if(result.data.status === 'success'){
    return result.data.tasks;
  }else{
    console.log('error : ',result);
  }
};

export const createUpdateTask = async (type, formData) => {
  const result = await postRequest(`${apiUrl}/tasks/${type}`,formData);
  console.log('result from task api : ',result);
  if(result.data.status === 'success'){
    return 'success';
  }else{
    return 'error';
  }
}

export const deleteTask = async (formData) => {  
  const result = await postRequest(`${apiUrl}/tasks/delete`,formData);
  console.log('result : ', result );
  if(result.data.status === 'success'){
    return 'success'
  }else{
    return 'error';
  }
}

export const getUserList = async () => {
  const result = await getRequest(`${apiUrl}/tasks/listusers`);
  if(result.data.status === 'success'){
    return result.data.users;
  }else{
    console.log('error : ',result);
  }
};