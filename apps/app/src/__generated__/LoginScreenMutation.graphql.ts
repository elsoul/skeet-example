/**
 * @generated SignedSource<<bf6c828634cd3c134c362ceef3d25c1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginScreenMutation$variables = {
  token?: string | null;
};
export type LoginScreenMutation$data = {
  readonly login: {
    readonly token: string | null;
  } | null;
};
export type LoginScreenMutation = {
  response: LoginScreenMutation$data;
  variables: LoginScreenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "LoginResponse",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginScreenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginScreenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b3ef8eae9133630a3ee3f056c49a05e",
    "id": null,
    "metadata": {},
    "name": "LoginScreenMutation",
    "operationKind": "mutation",
    "text": "mutation LoginScreenMutation(\n  $token: String\n) {\n  login(token: $token) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "8a86c3e0cd841af372090ad3fd16a687";

export default node;
