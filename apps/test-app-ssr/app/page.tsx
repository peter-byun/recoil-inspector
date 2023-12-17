'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './page.module.css';
import { stepperState } from '@/states/stepper';
import { stepperSecondState } from '@/states/stepper-second';
import { sumSelector } from '@/states/sum';

import { CardSubscribedToStep } from './cards/CardSubscribedToStep';

export default function Home() {
  const [stepper, setStepper] = useRecoilState(stepperState);
  const [stepperSecond, setStepperSecond] = useRecoilState(stepperSecondState);

  const sum = useRecoilValue(sumSelector);

  return (
    <main className={styles.main}>
      <h1>A SSR test app</h1>

      <p>Step: {stepper}</p>
      <p>Step Second: {stepperSecond}</p>

      <p>Sum: {sum}</p>
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

      <section>
        <h2>Cards</h2>
        {new Array(10).fill(1).map((_, idx) => (
          <CardSubscribedToStep key={idx} />
        ))}
      </section>
    </main>
  );
}
