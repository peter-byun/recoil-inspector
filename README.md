# Recoil Inspector 🔍

Ever wondered which components are subscribing which states, or had hard time debugging how Recoil states change? <br/>
Recoil Inspector is here for you. <br/>

### Table of Contents

- What it does
- Installation Guide
- Acknowledgement

## <br/>

# What it does

### State and Components Visualization

Observe which components are referencing which Recoil states, and their data.

<br/>

### State Changes History

Record every Recoil state changes to see when the data have changed by which component.

<br/>

### State Change Diff

Diff Recoil state changes to see which part of data have updated.

<br/>

---

# Installation Guide

1. Install the [React Devtool extension](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US&utm_source=ext_sidebar) if you have not already.

2. Install the NPM package.
   ```zsh
   npm install recoil-inspector
   ```
3. Import the package in your entry point like the below examples.

   ```tsx
   // Vite Client Side Rending Example
   import { RecoilRoot } from 'recoil';
   import { RecoilInspector } from 'recoil-inspector';

   function App() {
     return (
       <RecoilRoot>
         <div className="App">
           {/* Add the below line inside a <RecoilRoot> */}
           <RecoilInspector />
         </div>
       </RecoilRoot>
     );
   }

   export default App;
   ```

   ```tsx
   // Next.js Server Side Rending Example
   import type { AppProps } from 'next/app';
   import { RecoilRoot } from 'recoil';
   import { RecoilInspector } from 'recoil-inspector';

   export default function App({ Component, pageProps }: AppProps) {
     return (
       <RecoilRoot>
         {/* Add the below line inside a <RecoilRoot> */}
         <RecoilInspector />
         <Component {...pageProps} />;
       </RecoilRoot>
     );
   }
   ```

---

# Acknowledgement

This project is inspired by many other devtools, including Redux DevTools, React Developer Tools, Recoil Dev Tools, and Recoilize.
