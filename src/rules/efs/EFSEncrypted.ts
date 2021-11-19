/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { parse } from 'path';
import { CfnResource } from 'aws-cdk-lib';
import { CfnFileSystem } from 'aws-cdk-lib/aws-efs';
import { resolveIfPrimitive } from '../../nag-pack';

/**
 * Elastic File Systems are configured for encryption at rest
 * @param node the CfnResource to check
 */
export default Object.defineProperty(
  (node: CfnResource): boolean => {
    if (node instanceof CfnFileSystem) {
      const encrypted = resolveIfPrimitive(node, node.encrypted);
      if (encrypted === false) {
        return false;
      }
    }
    return true;
  },
  'name',
  { value: parse(__filename).name }
);
