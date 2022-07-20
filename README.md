# README

## Commands

```sh
# build
npm run build

# deploy
aws s3 sync build/ s3://s3-mtc-haba-link/

# CloudFront Chache Clear
export DISTRIBUTION_ID=`aws cloudfront list-distributions | jq -r '.DistributionList.Items[0].Id'`
echo $DISTRIBUTION_ID

aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

## ToDo

- Framework
  - Login
  - UnitTest
  - Security (Backend)
- AWS
  - CodePipelineでの通知メールをカスタム
- 機能面（フロントエンド）
  - Summary: 記録した回数の合計（月毎／全部）の表示
  - Register: カレンダーで日付を選択した時に背景色を切り替えたい
  - Register: 「今日」ボタンを押下した時に、今日の日付に切り替えたい
  - Register: 未来日は選択不可とする
  - index: アプリのアップデート表示をダイアログ化
