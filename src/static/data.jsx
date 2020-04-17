import React from 'react';
export const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href='javascrip:void'>{text}</a>
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    
    {
        title: 'Contact Number',
        dataIndex: 'phone'
    },
    {
      title: 'Website',
      dataIndex: 'website'
    }
  ];