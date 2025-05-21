import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { useSession, type Cart } from '../contexts/session/SessionContext';

export default function ItemDetail() {
  const {
    session: { cart },
  } = useSession();

  const { curItem } = useOutletContext<{ curItem: Cart }>();
  const { id } = useParams();
  console.log('🚀 item:', curItem, id);
  let item = curItem;
  if (!curItem) {
    if (!id) {
      return <Navigate to='/items' />;
    }

    item = cart.find(item => item.id === +id)!;
  }

  return (
    <>
      <h2>ItemDetail: {item.name}</h2>
      <div>금액: {item.price.toLocaleString()}</div>
    </>
  );
}
