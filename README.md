# README

## Local Environment

```sh
# .env を誤ってコミットしないように除外
git update-index --assume-unchanged .env
```

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
  - index: アプリのアップデート表示をダイアログ化
