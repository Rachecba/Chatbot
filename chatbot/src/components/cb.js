import React, {Component} from 'react';
import MainTheme from './theme.js'
import steps from '../steps.js'

class CB extends Component {
  
  render() {
    return(
      <div>
        <MainTheme steps={steps} />

      </div>
    )
  }

}

export default CB
