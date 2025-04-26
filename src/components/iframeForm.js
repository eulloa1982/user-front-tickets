import React, { Component } from 'react'

export class iframeForm extends Component {

  render() {
    return (
      <div>
        <iframe 
        title='Azure Form'
        width="100%" height="100%" 
        src="https://forms.office.com/Pages/ResponsePage.aspx?id=EK0Tc4W4UEucdZ272XVhjynx0fUjSN5GslWd2pB-yeFUM00zNklFT1U3UUVFU0pGOEswM1pOQVJFMC4u&embed=true" frameborder="0" marginwidth="0" marginheight="0" 
        style={{ border: "none", maxWidth:'100%', height:'100vh'}} 
        allowfullscreen> 
        </iframe>

      </div>
    )
  }
}

export default iframeForm