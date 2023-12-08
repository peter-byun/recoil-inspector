'use client';

import { useRecoilState } from 'recoil';
import styles from './page.module.css';
import { stepperState } from '@/states/stepper';

export default function Home() {
  const [stepper, setStepper] = useRecoilState(stepperState);
  return (
    <main className={styles.main}>
      <h1>A SSR test app</h1>

      <p>Step: {stepper}</p>
      <button
        onClick={() => {
          setStepper(stepper + 1);
        }}
      >
        Increase
      </button>
    </main>
  );
}
