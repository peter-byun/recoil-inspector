'use client';

import { useRecoilState, useRecoilValue } from 'recoil';

import { stepperState } from '@/states/stepper';
import { stepperSecondState } from '@/states/stepper-second';
import { sumSelector } from '@/states/sum';
import { Card } from './Card';
import { CardSubscribedToStep } from './CardSubscribedToStep';
import { useGetCards } from './useGetCards';

export default function Cards() {
  const [stepper, setStepper] = useRecoilState(stepperState);
  const [stepperSecond, setStepperSecond] = useRecoilState(stepperSecondState);

  const sum = useRecoilValue(sumSelector);

  const cardsQuery = useGetCards();

  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'auto',
        gap: '8px',
      }}
    >
      <Card>stepper: {stepper}</Card>
      <Card>stepperSecond: {stepperSecond}</Card>
      <Card>sum: {sum}</Card>

      {cardsQuery.isSuccess && JSON.stringify(cardsQuery.data)}

      <div>
        <button
          onClick={() => {
            setStepper(stepper + 1);
          }}
        >
          Increase Step
        </button>
        <button
          onClick={() => {
            setStepperSecond(stepperSecond + 1);
          }}
        >
          Increase Second Step
        </button>
      </div>

      <section>
        <h2>Cards</h2>
        {new Array(100).fill(1).map((_, idx) => (
          <CardSubscribedToStep key={idx} />
        ))}
      </section>
    </main>
  );
}
