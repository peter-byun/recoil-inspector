import { useRecoilState, useRecoilValue } from 'recoil';

import { countState } from '../store/count';
import { countSecondState } from '../store/count-second';
import { sumState } from '../store/sum';

export const Adder = () => {
  const count = useRecoilValue(countState);
  const countSecond = useRecoilValue(countSecondState);

  const [sum, setSum] = useRecoilState(sumState);

  const addCounts = () => {
    setSum(count + countSecond);
  };

  return (
    <>
      <h1>Sum: {sum}</h1>
      <button onClick={addCounts}>Hit me 😛</button>
    </>
  );
};
