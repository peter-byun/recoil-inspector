'use client';

import { useRecoilState, useRecoilValue } from 'recoil';

import { stepperState } from '@/states/stepper';
import { stepperSecondState } from '@/states/stepper-second';
import { sumSelector } from '@/states/sum';
import { Card } from './Card';
import { useQuery } from '@tanstack/react-query';

export default function Cards() {
  const [stepper, setStepper] = useRecoilState(stepperState);
  const [stepperSecond, setStepperSecond] = useRecoilState(stepperSecondState);

  const sum = useRecoilValue(sumSelector);

  const cardsQuery = useQuery({
    queryKey: ['cards'],
    queryFn: () => {
      return fetch('/api/cards').then((res) => res.json());
    },
  });

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
    </main>
  );
}
