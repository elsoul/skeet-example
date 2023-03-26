/**
 * @generated SignedSource<<181fde696fc9d6f4c0c8a5816f2ab995>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GreatButtonMutation$variables = {
  postId?: string | null;
  toUserId?: string | null;
};
export type GreatButtonMutation$data = {
  readonly sendGreat: boolean | null;
};
export type GreatButtonMutation = {
  response: GreatButtonMutation$data;
  variables: GreatButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "postId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "toUserId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "postId",
        "variableName": "postId"
      },
      {
        "kind": "Variable",
        "name": "toUserId",
        "variableName": "toUserId"
      }
    ],
    "kind": "ScalarField",
    "name": "sendGreat",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GreatButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GreatButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f4d909ff6e3ce0012bfc967401160d36",
    "id": null,
    "metadata": {},
    "name": "GreatButtonMutation",
    "operationKind": "mutation",
    "text": "mutation GreatButtonMutation(\n  $toUserId: String\n  $postId: String\n) {\n  sendGreat(toUserId: $toUserId, postId: $postId)\n}\n"
  }
};
})();

(node as any).hash = "6b438c035aac661cb82faf5f1808bfbf";

export default node;
