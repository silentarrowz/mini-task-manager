import React from 'react';
import TaskCard from '../components/TaskCard';

export default {
  title: 'Example/TaskCard',
  component: TaskCard,  
};


const Template = (args) => <TaskCard {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
  priority: 'high'
};