import Head from 'next/head';

import { Adder } from '../components/Adder';
import { Counter } from '../components/Counter';
import { CounterSecond } from '../components/CounterSecond';
import { LocalCounter } from '../components/LocalCounter';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>A Next.js Example App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>A Next.js SSR Example</h1>
        <Counter />
        <CounterSecond />
        <Adder />
        <LocalCounter />
      </main>
    </div>
  );
}
