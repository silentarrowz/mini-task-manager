import React from 'react';
import Avatar from '../components/Avatar';

export default {
  title: 'Example/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};


const Template = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'Faraz Ahmed'
};