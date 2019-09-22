import React from 'react'
import Github from './components/github.js'
import LinkedIn from './components/linkedin.js'
import Blog from './components/blog.js'

const steps = [
  {
       id: '1',
       message: 'What is your name?',
       trigger: '2',
     },
     {
       id: '2',
       user: true,
       trigger: '3',
     },
     {
       id: '3',
       message: 'Hi {previousValue}, nice to meet you!',
       trigger: '4',
     },
     {
       id: '4',
       message: 'Welcome to my site, what would you like to look at?',
       trigger: '5',
     },
     {
       id: '5',
       options: [
         { value: 1, label: 'Github', trigger: '6' },
         { value: 2, label: 'LinkedIn', trigger: '7' },
         { value: 3, label: 'Blog', trigger: '8' },

       ],
     },
     {
       id: '6',
       component: <Github />,
       end: true,
     },
     {
       id: '7',
       component: <LinkedIn />,
       end: true,
     },
     {
       id: '8',
       component: <Blog />,
       end: true,
     },


]

;

export default steps;