/**
 * @generated SignedSource<<0309bbd4671889ce788374f218f2dc65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AwesomeButtonMutation$variables = {
  postId?: string | null;
  toUserId?: string | null;
};
export type AwesomeButtonMutation$data = {
  readonly sendAwesome: boolean | null;
};
export type AwesomeButtonMutation = {
  response: AwesomeButtonMutation$data;
  variables: AwesomeButtonMutation$variables;
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
    "name": "sendAwesome",
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
    "name": "AwesomeButtonMutation",
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
    "name": "AwesomeButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "aaa2dbc32f9a856a0d5e56f6ce97e87f",
    "id": null,
    "metadata": {},
    "name": "AwesomeButtonMutation",
    "operationKind": "mutation",
    "text": "mutation AwesomeButtonMutation(\n  $toUserId: String\n  $postId: String\n) {\n  sendAwesome(toUserId: $toUserId, postId: $postId)\n}\n"
  }
};
})();

(node as any).hash = "162309c146e3c8724af194b702f781a3";

export default node;
