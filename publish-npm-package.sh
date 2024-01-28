pnpm install
pnpm build --filter recoil-inspector

cd packages/recoil-inspector
npm version patch
npm publish --access public

sh scripts/bust_node_modules.sh .
pnpm install

git add -A
git commit -m "chore updated package versions"
git push origin main