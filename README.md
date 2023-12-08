# Recoil Inspector 🔍 &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Ever wondered which components are subscribing which states, or had hard time debugging how Recoil states change? <br/>
Recoil Inspector is here for you. <br/>

## Contents

- [Demo](#demo)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Acknowledgement](#acknowledgement)

<a name="demo"></a>

## Demo 📼

https://github.com/PeterByun/recoil-inspector-project/assets/47588056/21b19ee0-1771-423b-a733-bd2427355b3c

<a name="features"></a>

## Features ⚡️

- <strong>State and Components Visualization ⚛️</strong>
  - See which components are referencing which Recoil states and props.
- <strong>State Changes History ⏺</strong>
  - See how states have been changed over time. You can compare two changes to see exactly which properties have been updated, deleted, or added.
- <strong>Tree-shakable 🌳</strong>
  - It is activated only when `process.env.NODE_ENV` is `development`, and debugger code is lazily loaded only when it is enabled to avoid increasing your application's bundle size.

<a name="installation-guide"></a>

# Installation Guide 💿

1. Install the [React Devtool extension](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US&utm_source=ext_sidebar) if you have not already.

2. Install the NPM package.
   ```zsh
   npm install recoil-inspector
   ```
3. Import the package in your entry point like the below examples.

<strong>Next.js App Router</strong>

```tsx
// layout.ts
import { RecoilInspector } from 'recoil-inspector';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <RecoilRoot>
        <body>
          <RecoilInspector />
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
```

<a name="acknowledgement"></a>

## Acknowledgement

This project is inspired by many other great devtools, including Redux DevTools, React Developer Tools, Recoil Dev Tools, and Recoilize.
