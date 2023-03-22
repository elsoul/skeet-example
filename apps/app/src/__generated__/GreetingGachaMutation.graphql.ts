/**
 * @generated SignedSource<<b77a4a0ab4efe91091733024d7435610>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GreetingGachaMutation$variables = {
  content?: string | null;
  transferAmountLamport?: number | null;
};
export type GreetingGachaMutation$data = {
  readonly greetingGacha: boolean | null;
};
export type GreetingGachaMutation = {
  response: GreetingGachaMutation$data;
  variables: GreetingGachaMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "content"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "transferAmountLamport"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "content",
        "variableName": "content"
      },
      {
        "kind": "Variable",
        "name": "transferAmountLamport",
        "variableName": "transferAmountLamport"
      }
    ],
    "kind": "ScalarField",
    "name": "greetingGacha",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GreetingGachaMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GreetingGachaMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "83512e196563538c4de8c4ba0dfd7492",
    "id": null,
    "metadata": {},
    "name": "GreetingGachaMutation",
    "operationKind": "mutation",
    "text": "mutation GreetingGachaMutation(\n  $content: String\n  $transferAmountLamport: Int\n) {\n  greetingGacha(content: $content, transferAmountLamport: $transferAmountLamport)\n}\n"
  }
};
})();

(node as any).hash = "8df2e105b5cdf85cd0608878b2f5babd";

export default node;
