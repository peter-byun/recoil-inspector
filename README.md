# Recoil Inspector 🔍 &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Ever wondered which components are subscribing which states, or had hard time debugging how Recoil states change? <br/>
Recoil Inspector is here for you. <br/>

---

# Table of Contents

- What it does
- Installation Guide
- Acknowledgement

---

# What it does 🎯

**Demo 📼**

https://github.com/PeterByun/recoil-inspector-project/assets/47588056/21b19ee0-1771-423b-a733-bd2427355b3c

### State and Components Visualization

See which components are referencing which Recoil states and props.

<br/>

### State Changes History

See how states have been changed over time. </br>
You can compare two changes to see exactly which properties have been updated, deleted, or added.

---

# Installation Guide 💿

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

This project is inspired by many other great devtools, including Redux DevTools, React Developer Tools, Recoil Dev Tools, and Recoilize.
