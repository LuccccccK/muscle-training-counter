# README

## Local Environment

```sh
# .env を誤ってコミットしないように除外
git update-index --assume-unchanged .env

# CloudFormation用のパラメータファイルに正規の値を入れた状態でコミットしないように除外
git update-index --assume-unchanged aws-cfn/*.json
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
  - Security (Backend)
- AWS
  - CodePipelineでの通知メールをカスタム
