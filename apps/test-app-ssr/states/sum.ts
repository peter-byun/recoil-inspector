import { selector } from 'recoil';
import { stepperState } from './stepper';
import { stepperSecondState } from './stepper-second';

export const sumSelector = selector({
  key: 'sumState',
  get: ({ get }) => {
    const stepper = get(stepperState);
    const stepperSecond = get(stepperSecondState);

    return stepper + stepperSecond;
  },
});
