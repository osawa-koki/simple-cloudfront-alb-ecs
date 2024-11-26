# simple-cloudfront-alb-ecs

☢️☢️☢️ `CloudFront + ALB + ECS`のシンプルな構成のテンプレート！  

[![ci](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/ci.yml/badge.svg)](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/ci.yml)
[![cd](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/cd.yml/badge.svg)](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/cd.yml)
[![Dependabot Updates](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/osawa-koki/simple-cloudfront-alb-ecs/actions/workflows/dependabot/dependabot-updates)

![成果物](./fruit.gif)  

## 技術スタック

- AWS CDK
  - TypeScript
  - AWS CloudFormation
- AWS CloudFront
- AWS ALB
- AWS ECS
  - AWS Fargate
  - (AWS ECR)

## 実行方法

`.env.example`をコピーして`.env`ファイルを作成します。  
中身を適切に設定してください。  

DevContainerに入り、以下のコマンドを実行します。  
※ `~/.aws/credentials`にAWSの認証情報があることを前提とします。  

```shell
cdk bootstrap
cdk synth
cdk deploy --require-approval never --all
```

---

GitHub Actionsでデプロイするためには、以下のシークレットを設定してください。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | AWSのリージョン |
| DOTENV | `.env`ファイルの内容 |

タグをプッシュすると、GitHub Actionsがデプロイを行います。  
手動でトリガーすることも可能です。  

## デプロイ後の確認

以下のコマンドを実行して、エンドポイントを取得します。  

```shell
source .env

# ALBのエンドポイント
aws cloudformation describe-stacks --stack-name ${BASE_STACK_NAME}-output --query "Stacks[0].Outputs[?OutputKey=='LoadBalancerDNS'].OutputValue" --output text

# CloudFrontのエンドポイント
aws cloudformation describe-stacks --stack-name ${BASE_STACK_NAME}-output --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomainName'].OutputValue" --output text
```

ALBへ直接アクセスはできず、CloudFrontを経由してのみアクセスできることが確認できます。  

## めっちゃ余談

Googleが開発した[Emoji Kitchen](https://emojikitchen.dev/)、放射線の絵文字を動物をミックスさせるとめっちゃ怖い、、、😱😱😱  
他にも結構ヤバイのがあるらしい、、、  
「🍄」と「☁️」のミックスとかは削除されたらしいけど、、、😱😱😱  

![emoji-kitchen](./emoji-kitchen.gif)  
