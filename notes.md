# Errors & Fixes

## 1. Tailwind Preset Error
**Error:** `Cannot find module './tailwind-preset.js'`
**Fix:** In `tailwind.config.js` replace `require('./tailwind-preset.js')` with `require('nativewind/preset')`

## 2. NativeWind Not Configured Error
**Error:** `Tailwind CSS has not been configured with the NativeWind preset`
**Fix:** Same as above — ensure `presets: [require('nativewind/preset')]` is in `tailwind.config.js`

## 3. Missing react-dom Module
**Error:** `Unable to resolve module react-dom/client`
**Fix:** Run `npx expo install react-dom react-native-web` then `npx expo start --clear`

## 4. Deleted Files Recovery
**Error:** Accidentally deleted files
**Fix:** Run `git status` to see deleted files, then `git restore src/app/_layout.tsx src/app/index.tsx`

## 5. Dependency Version Conflicts
**Error:** General package version mismatches
**Fix:** Run `npx expo install --fix` then `npx expo start --clear`
**Nuclear option:** `rm -rf node_modules` → `npm install` → `npx expo start --clear`

## 6. Syntax Error in TSX file
**Error:** `Unexpected token` / red squiggly lines throughout file
**Fix:** Check all opening brackets `{` have matching closing `}`. Options `}}` needs double closing brace, followed by `/>` to close the tag

## 7. Simulator Shows White Screen
**Error:** Simulator goes white after code changes
**Fix:** Run `npx expo start --clear` then press `i` in terminal to force iOS reload

# Useful Commands

## Daily Workflow
- Start server: `npx expo start`
- Start with cache clear: `npx expo start --clear`
- Stop server: `Ctrl + C`
- Restart last command: `Up arrow` then `Enter`

## Git
- Check status: `git status`
- Save to GitHub: `git add .` → `git commit -m "message"` → `git push`
- Restore deleted files: `git restore filename`
- Create new branch: `git checkout -b branchname`
- Check current branch: `git branch`
- Push to specific branch: `git push origin branchname`

## Packages
- Fix package versions: `npx expo install --fix`
- Install specific package: `npx expo install packagename`
- Full clean reinstall: `rm -rf node_modules` → `npm install`