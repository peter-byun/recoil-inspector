yarn install
yarn run build --filter recoil-inspector

cd packages/recoil-inspector
npm version patch
npm publish --access public