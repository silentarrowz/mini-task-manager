import React from 'react';
import Progress from '../components/Progress';

export default {
  title: 'Example/Progress',
  component: Progress,  
};


const Template = (args) => <Progress {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};