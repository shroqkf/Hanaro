import { useState } from 'react';
import { type Cart, useSession } from '../contexts/session/SessionContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function ItemLayout() {
  const {
    session: { cart },
  } = useSession();

  const navigate = useNavigate();

  const [curItem, setCurItem] = useState<Cart>();

  const goItem = (id: number) => {
    setCurItem(cart.find(item => item.id === id));
    navigate(id.toString());
  };

  return (
    <div className='border' style={{ width: '30rem' }}>
      <ul>
        {cart.map(({ id, name }) => (
          <li key={id}>
            <button onClick={() => goItem(id)}>
              {id}. {name} <FaExternalLinkAlt />
            </button>
          </li>
        ))}
      </ul>
      <div>
        <Outlet context={{ curItem }} />
      </div>
    </div>
  );
}
