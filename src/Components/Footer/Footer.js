import React from 'react';
import { MDBFooter} from 'mdb-react-ui-kit';
import {FaLinkedinIn,FaGithub} from 'react-icons/fa';

function Footer() {
    return (
      <MDBFooter className='bg-white text-center text-muted'>
        <hr/>
        <div>
            
          </div>
          <div>
            <span>© University of South Carolina - {new Date().getFullYear()} .</span>
            <br/><br/>
        </div>
      </MDBFooter>
    );
  }
  export default Footer;