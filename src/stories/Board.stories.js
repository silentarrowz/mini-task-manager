import React from 'react';
import Board from '../components/Board';

export default {
  title: 'Example/Board',
  component: Board,  
};


const Template = (args) => <Board {...args} />;

export const Primary = Template.bind({});
Primary.args = {
 
};