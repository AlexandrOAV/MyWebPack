import  { useState } from 'react'
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';

export const App = () => {
    const [count, setCount] = useState <number> (0);

    const increment = () => setCount(prev => prev+1);
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/shop'}>Shop</Link>
     
        <h1 className={classes.value}>{count}</h1>
      <button type='button' className={classes.button} onClick={increment}>INC</button>
      <Outlet/>
    </div>
  )
}


