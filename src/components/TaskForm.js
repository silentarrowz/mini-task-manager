import React, { useEffect, useContext } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import moment from 'moment';
import { createUpdateTask } from "../api-calls";
import { AppContext } from '../context';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};

const TaskForm = ({ item, onCancel }) => {  
  const [form] = Form.useForm();
  const [state, setState, getUpdatedTasks] = useContext(AppContext);

  useEffect(()=>{
    if(item && item.id){
      form.setFieldsValue({
        message: item.message,
        priority: item.priority,
        taskid: item.id,
        due_date: item.due_date ? moment(new Date(item.due_date)):'',
        assigned_to: item.assigned_to,
      });
    }
  },[item]);

  const onFinish = (values) => {    
    const formData = new FormData();
    let type = 'create';
    console.log('values : ',values);
    const dateFormat = "YYYY-MM-DD HH:mm:ss"
    const dateString = moment(values.due_date).format(dateFormat);
    console.log('date String : ', dateString);

    if(item){
      Object.keys(item).map((key)=>{
        if(key==='due_date'){
          formData.append(key, dateString);
        }else{
          formData.append(key, values[key]);
        }    
      });      
      formData.append('taskid',item.id); 
      type = 'update';     
    }else{
      Object.keys(values).map((key)=>{
        if( dateString && key==='due_date'){
          formData.append(key, dateString);
        }else{
          formData.append(key, values[key]);
        }  
      });
    }    
    
    createUpdateTask(type, formData)
    .then((res)=>{
      console.log('res : ',res);  
      form.resetFields();
      message.success(`Task ${type}d successfully!`);    
      onCancel();     
      setState(state => ({...state, action: type}))
      getUpdatedTasks();
    })
    .catch((err) => {
      console.log('err : ',err);
      message.error('There was an error');
    });
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const dateFormat = "YYYY/MM/DD ";
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="message" 
        label="Task"
        rules={[{ required: true, message: "Please input Task" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="priority"  
        label="Priority"
        rules={[{ required: false }]}
      >
        <Select
          placeholder="Select a option and change input text above"          
          allowClear
        >
          <Option value="1">Normal</Option>
          <Option value="2">Medium</Option>
          <Option value="3">High</Option>
        </Select>
      </Form.Item>
      <Form.Item name="due_date" label="Due Date">
        <DatePicker onChange={onDateChange} format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="assigned_to"        
        label="Assign To"
        // rules={[{ required: true }]}
      >
        <Select
          placeholder="Select a option and change input text above"
          // onChange={(value) => form.setFields({ assigned_to: value })}
          allowClear
        >
          {state.users.map((user)=>{
            return(
              <Option value={user.id}>{user.name}</Option>
            );
          })}          
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={onCancel} style={{ marginRight: "8px" }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
