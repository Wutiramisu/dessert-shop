#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
npm run build
cd dist
# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init
git add -A
git commit -m 'deploy'
# 將dist資料夾中的內容推送至遠端https://github.com/Wutiramisu/dessert-shop.git的gh-pages分支中
# 並強制無條件將舊有的內容取代成目前的內容（指令 git push -f)
git push -f https://github.com/Wutiramisu/dessert-shop.git master:gh-pages
cd -
