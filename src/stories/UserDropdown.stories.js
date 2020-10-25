import React from 'react';
import UserDropdown from '../components/UserDropdown';

export default {
  title: 'Example/UserDropdown',
  component: UserDropdown,  
};


const Template = (args) => <UserDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
};