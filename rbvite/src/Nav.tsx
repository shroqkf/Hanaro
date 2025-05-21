import clsx from 'clsx';
import './Nav.css';
import { useSession } from './contexts/session/SessionContext';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const {
    session: { loginUser },
  } = useSession();
  return (
    <>
      <ul className='nav'>
        <li>
          <NavLink to='/' replace>
            Home
          </NavLink>
        </li>
        {loginUser ? (
          <li>
            <NavLink
              to='/my'
              style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
            >
              My
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              to='/login'
              className={({ isActive }) => clsx({ red: isActive })}
            >
              Login
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to='/posts'>Posts</NavLink>
        </li>
        <li>
          <NavLink to='/items'>Items</NavLink>
        </li>
        <li>
          <NavLink to='/hello'>About</NavLink>
        </li>
        <li>
          <NavLink to='/sadfdsafafds'>NotFound</NavLink>
        </li>
      </ul>
    </>
  );
}
