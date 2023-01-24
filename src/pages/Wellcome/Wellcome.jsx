import * as React from 'react';
import Button from '@mui/material/Button';
import mhands from './m-hands.png';
import './Wellcome.css';

function Wellcome() {
  return (
    <div className="wellcome">
      <header className="wellcome-header">
        <img src={mhands} className="wellcome-logo" alt="logo" />
        <h1 className='text-extrablack'>کارباکار</h1>
        <p>
          باهم برای هم برای زندگی آزاد
        </p>
        <Button variant="contained">ورود یا ثبت نام</Button>
        
      </header>
    </div>
  );
}

export default Wellcome;
