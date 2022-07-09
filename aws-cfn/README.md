# README

1. Route53 にサブドメインのホストゾーンを作成

    ```sh
    aws cloudformation create-stack --stack-name MtcCfnRoute53ForSubDomain --template-body file://mtc-cfn-route53-for-subdomain.yaml
    # aws cloudformation update-stack --stack-name MtcCfnRoute53ForSubDomain --template-body file://mtc-cfn-route53-for-subdomain.yaml
    # aws cloudformation delete-stack --stack-name MtcCfnRoute53ForSubDomain
    ```

1. 作成したホストゾーンのNSレコードの値をコピーして、委任先の親ドメインのNSレコードとして登録（手作業）

    参考URL: `https://note.com/dafujii/n/n352e3d07dcfd`

1. 作成したホストゾーンのIDを取得し、mtc-cfn-acm-parameters.json / mtc-cfn-web-parameters.json を更新

    ```sh
    aws cloudformation describe-stacks --stack-name MtcCfnRoute53ForSubDomain | jq -r '.Stacks[].Outputs[0].OutputValue'
    ```

1. ACMを登録

    ```sh
    # 証明書はCloudFrontがデプロイされるバージニア北部にリソースが存在する必要があるため、明示的にregionを指定
    aws cloudformation create-stack \
        --stack-name MtcCfnACM \
        --template-body file://mtc-cfn-acm.yaml \
        --parameter file://mtc-cfn-acm-parameters.json \
        --region us-east-1
    # aws cloudformation delete-stack --stack-name MtcCfnACM --region us-east-1
    ```

1. 作成したACMのARNを取得し、mtc-cfn-web-parameters.json を更新

    ```sh
    aws cloudformation describe-stacks --stack-name MtcCfnACM --region us-east-1 | jq -r '.Stacks[].Outputs[0].OutputValue'
    ```

1. S3 Bucket / CloudFront Distribution を構築

    ```sh
    aws cloudformation create-stack --stack-name MtcCfnWeb --template-body file://mtc-cfn-web.yaml --parameter file://mtc-cfn-web-parameters.json
    # aws cloudformation update-stack --stack-name MtcCfnWeb --template-body file://mtc-cfn-web.yaml --parameter file://mtc-cfn-web-parameters.json
    # aws cloudformation delete-stack --stack-name MtcCfnWeb
    ```

1. サブドメインのホストゾーンにCloudFront DistributionのドメインをAレコードとして登録

    ```sh
    aws cloudformation create-stack --stack-name MtcCfnRoute53 --template-body file://mtc-cfn-route53.yaml
    # aws cloudformation delete-stack --stack-name MtcCfnRoute53
    ```
