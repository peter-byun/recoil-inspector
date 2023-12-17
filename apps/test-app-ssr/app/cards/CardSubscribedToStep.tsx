import styles from './cards.module.css';
import { stepperState } from '@/states/stepper';
import { useRecoilState } from 'recoil';

export function CardSubscribedToStep() {
  const [stepper] = useRecoilState(stepperState);

  return <div className={styles.card}>{stepper}</div>;
}
