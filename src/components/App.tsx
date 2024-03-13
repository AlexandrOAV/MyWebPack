import  { useState } from 'react'
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import cityPng from '@/assets/city.png'
import flagJpg from '@/assets/photoflag.jpg'
import Fresh from "@/assets/fresh.svg"


export const App = () => {
    const [count, setCount] = useState <number> (0);

    const increment = () => setCount(prev => prev+1);

  return (
    <div>
      <h1>PLATFORM = {__PLATFORM__}</h1>
      <div>
      <img width='100' src={cityPng} alt="city" />
      <img width='100' src={flagJpg} alt="city" />
      </div>
      <div>
        <Fresh width ={'100'} height={'100'} fill='red' stroke='green'/>
      </div>

      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/shop'}>Shop</Link>
     
  

      <h1 className={classes.value}>{count}</h1>
      <button type='button' className={classes.button} onClick={increment}>INC</button>
      <Outlet/>
    </div>
  )
}


