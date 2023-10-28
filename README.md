# Recoil Inspector 🔍

> ❕ Note: We are still working on this project, but if you are interested in this project, please feel free to try it out and give us feedback!

---

# Installation Guide

1. Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US) from the Chrome web store.

   1-2. Install Recoil Inspector devtool from the Chrome web store.
   (Not yet available, but if you want you can try it out by building it from the source code. See the Contributing.md file.)

2. Install the NPM package.
   ```zsh
   npm install recoil-inspector
   ```
3. Import the package in your entry point like the below examples.

   ```tsx
   // Client Side Rendering app using Vite's React template.
   import { RecoilRoot } from 'recoil';
   import RecoilInspector from 'recoil-inspector';

   function App() {
     return (
       <RecoilRoot>
         <div className="App">
           <RecoilInspector />
           {/* Your application code goes here */}
         </div>
       </RecoilRoot>
     );
   }

   export default App;
   ```

   ```tsx
   // Server Side Rendering app using Next.js.
   import type { AppProps } from 'next/app';
   import { RecoilRoot } from 'recoil';
   import RecoilInspector from 'recoil-inspector';

   export default function App({ Component, pageProps }: AppProps) {
     return (
       <RecoilRoot>
         <RecoilInspector />
         <Component {...pageProps} />;
       </RecoilRoot>
     );
   }
   ```

4. Open up a Chrome devtool and start debugging!

# Features

### State and Components Visualization

Observe which components are referencing which Recoil states, and their data.

<br/>

### State Changes History

Record every Recoil state changes to see when the data have changed by which component.

<br/>

### State Change Diff

Diff Recoil state changes to see which part of data have updated.

<br/>

## Acknowledgements

This project is inspired by many other devtools, including Redux DevTools, React Developer Tools, Recoil Dev Tools, and Recoilize.
