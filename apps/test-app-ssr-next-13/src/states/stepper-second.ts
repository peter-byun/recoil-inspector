import { atom } from 'recoil';

export const stepperSecondState = atom<number>({
  key: 'stepperSecond',
  default: 0,
});
