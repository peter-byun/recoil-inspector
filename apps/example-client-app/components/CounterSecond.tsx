import { useRecoilState } from 'recoil';

import { countSecondState } from '../store/count-second';

export function CounterSecond() {
  const [count, setCount] = useRecoilState(countSecondState);

  const handleCount = () => {
    setCount((prevCount) => {
      return prevCount + 1;
    });
  };

  return (
    <>
      <h1>Second Count: {count}</h1>

      <button onClick={handleCount}>Hit me 😛</button>
    </>
  );
}
