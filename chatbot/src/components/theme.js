import React from 'react'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};


const MainTheme = (props) => {
  
  return(
  <div>
    <ThemeProvider theme={theme}>
      <ChatBot 
      headerTitle = "Charlie el bot"
      steps={props.steps} handleEnd={props.handleEnd}/>
    </ThemeProvider>

  </div>
  )
}

export default MainTheme
