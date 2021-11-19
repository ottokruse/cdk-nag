/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { parse } from 'path';
import { CfnResource, Stack } from 'aws-cdk-lib';
import { CfnFunction } from 'aws-cdk-lib/aws-lambda';

/**
 * Lambda functions are VPC enabled
 * @param node the CfnResource to check
 */
export default Object.defineProperty(
  (node: CfnResource): boolean => {
    if (node instanceof CfnFunction) {
      const vpcConfig = Stack.of(node).resolve(node.vpcConfig);
      if (vpcConfig == undefined) {
        return false;
      } else {
        const secgroups = Stack.of(node).resolve(vpcConfig.securityGroupIds);
        const subnets = Stack.of(node).resolve(vpcConfig.subnetIds);
        if (secgroups == undefined || secgroups.length == 0) {
          if (subnets == undefined || subnets.length == 0) {
            return false;
          }
        }
      }
    }
    return true;
  },
  'name',
  { value: parse(__filename).name }
);
