import React from 'react';
import TaskForm from '../components/TaskForm';

export default {
  title: 'Example/TaskForm',
  component: TaskForm,  
};


const Template = (args) => <TaskForm {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
  message:'Create dropdown',
  assigned_to: 1,
  priority: 2,
  due_date: '2020/02/19',
  taskid: 2343,
};