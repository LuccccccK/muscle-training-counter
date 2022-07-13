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

- Environment
  - CI/CD(Frontend)
  - CI/CD(Backend)
- Framework
  - Login
  - API call
  - UnitTest
- 機能面（フロントエンド）
  - 記録した回数の合計（月毎／全部）の表示
  - Logo 変更
  - カレンダーの見切れ
