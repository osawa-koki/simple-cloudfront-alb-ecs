import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

interface OutputStackProps extends cdk.StackProps {
  stackName: string;
  distribution: cloudfront.Distribution;
  fargateService: ecsPatterns.ApplicationLoadBalancedFargateService;
}

export default class OutputStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: OutputStackProps) {
    const { stackName, distribution, fargateService } = props;

    super(scope, id, {
      ...props,
      stackName,
    });

    new cdk.CfnOutput(this, 'CloudFrontDomainName', {
      value: distribution.domainName,
      description: 'The DNS name of the CloudFront distribution',
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: 'The DNS name of the load balancer for accessing the Fargate service',
    });
  }
}
