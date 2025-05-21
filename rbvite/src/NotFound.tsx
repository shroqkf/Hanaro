import { useLocation, useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const naviage = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const goPreviousPage = () => naviage(-1);
  const goHome = () => naviage('/', { state: { pathname } });

  return (
    <>
      <h2>404 Not Found!!</h2>
      <div>{location.pathname} 페이지를 찾을 수 없습니다!</div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={goHome} style={{ marginRight: '1rem' }}>
          홈으로 가기
        </button>
        <button onClick={goPreviousPage}>이전페이지로 가기</button>
      </div>
    </>
  );
};
