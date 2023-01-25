import * as React from 'react';
import Button from '@mui/material/Button';
import mhands from './m-hands.png';
import './Wellcome.css';
import { Link } from 'react-router-dom';

function Wellcome() {
  return (
    <div >
      <header className="wellcome-header">
        <img src={mhands} className="wellcome-logo" alt="logo" />
        <h1 className='text-extrablack'>کارباکار</h1>
        <h2>
          باهم برای هم برای زندگی آزاد
        </h2>
        <p>
          اقتصاد اجتماعی غیر پولی برای مبادله بدون واسطه محصولات و خدمات افراد و کسب و کارهای مولد
        </p>
        <Button component={Link} to="/index" variant="contained">ورود یا ثبت نام</Button>
        
      </header>
    </div>
  );
}

export default Wellcome;
