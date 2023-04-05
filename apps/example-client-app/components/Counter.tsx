import { useRecoilState } from 'recoil';

import { countState } from '../store/count';

export function Counter() {
  const [count, setCount] = useRecoilState(countState);

  const handleCount = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={handleCount}>Hit me 😛</button>
    </>
  );
}
