import RecoilInspector from 'recoil-inspector';
import { RecoilRoot } from 'recoil';

import { Adder } from './Adder';
import { Counter } from './Counter';
import { CounterSecond } from './CounterSecond';
import { LocalCounter } from './LocalCounter';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <RecoilInspector />
        <Counter />
        <CounterSecond />
        <Adder />
        <LocalCounter />
      </div>
    </RecoilRoot>
  );
}

export default App;
