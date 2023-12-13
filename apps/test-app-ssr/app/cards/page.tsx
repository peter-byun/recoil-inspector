'use client';

import { useRecoilState, useRecoilValue } from 'recoil';

import { stepperState } from '@/states/stepper';
import { stepperSecondState } from '@/states/stepper-second';
import { sumSelector } from '@/states/sum';
import { Card } from './Card';

export default function Cards() {
  const [stepper, setStepper] = useRecoilState(stepperState);
  const [stepperSecond, setStepperSecond] = useRecoilState(stepperSecondState);

  const sum = useRecoilValue(sumSelector);

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
