# Recoil Inspector

A reliable, and hassle free recoil dev tool.

## Installation

1. Install the [Recoil Inspector devtool](https://chrome.google.com/webstore/category/extensions?hl=en-US), and [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US) from the Chrome web store.
2. Install the NPM package.
   ```zsh
   npm install recoil-inspector
   ```
3. Import the package in your entry point like the below examples.

   ```tsx
   // Client Side Rendering using Vite's React template.
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
   // Server Side Rendering using Next.js.
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

## Features

### State and Components Visualization

See which components are referencing which Recoil states, and their data.

<!-- TODO: GIF goes here -->

### State Changes History

Record every Recoil state changes to see when the data have changed by which component.

<!-- TODO: GIF goes here -->

### State Change Diff

Diff Recoil state changes to see which part of data have updated.

<!-- TODO: GIF goes here -->

## Acknowledgement

This project is inspired by many other devtools, including Redux DevTools, React Developer Tools, Recoil Dev Tools, and Recoilize.
