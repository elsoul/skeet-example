/**
 * @generated SignedSource<<5dde826974981c6acae9dac472072446>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GoodButtonMutation$variables = {
  postId?: string | null;
  toUserId?: string | null;
};
export type GoodButtonMutation$data = {
  readonly sendGood: boolean | null;
};
export type GoodButtonMutation = {
  response: GoodButtonMutation$data;
  variables: GoodButtonMutation$variables;
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
    "name": "sendGood",
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
    "name": "GoodButtonMutation",
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
    "name": "GoodButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "bb1da93fbd02fc1c60162a5523aa5b62",
    "id": null,
    "metadata": {},
    "name": "GoodButtonMutation",
    "operationKind": "mutation",
    "text": "mutation GoodButtonMutation(\n  $toUserId: String\n  $postId: String\n) {\n  sendGood(toUserId: $toUserId, postId: $postId)\n}\n"
  }
};
})();

(node as any).hash = "3e249a57f4cbe926de200d82714e0cd8";

export default node;
