rm packages/recoil-inspector/package.json 
cp packages/recoil-inspector/package.publish.json packages/recoil-inspector/package.json

yarn install
yarn run build --filter recoil-inspector

cd packages/recoil-inspector
npm version patch
npm publish --access public