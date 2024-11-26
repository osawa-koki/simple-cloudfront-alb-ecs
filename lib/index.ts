import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import NetworkStack from './network/network';
import ComputeStack from './compute/compute';
import CdnStack from './cdn/cdn';
import OutputStack from './output/output';

export class IndexStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      stackName: process.env.BASE_STACK_NAME!,
    });

    const networkStack = new NetworkStack(this, 'NetworkStack', {
      stackName: `${process.env.BASE_STACK_NAME!}-network`,
    });

    const computeStack = new ComputeStack(this, 'ComputeStack', {
      stackName: `${process.env.BASE_STACK_NAME!}-compute`,
      vpc: networkStack.vpc,
    });
    computeStack.addDependency(networkStack);

    const cdnStack = new CdnStack(this, 'CdnStack', {
      stackName: `${process.env.BASE_STACK_NAME!}-cdn`,
      alb: computeStack.fargateService.loadBalancer,
    });
    cdnStack.addDependency(computeStack);

    const outputStack = new OutputStack(this, 'OutputStack', {
      stackName: `${process.env.BASE_STACK_NAME!}-output`,
      distribution: cdnStack.distribution,
    });
    outputStack.addDependency(cdnStack);
  }
}
