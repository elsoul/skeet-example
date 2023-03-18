/**
 * @generated SignedSource<<c1ba7168abd10da0947b104e13621750>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginScreenMutation$variables = {
  token: string;
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
    "cacheID": "5f880f34e9a10ff57aa8703b205ac310",
    "id": null,
    "metadata": {},
    "name": "LoginScreenMutation",
    "operationKind": "mutation",
    "text": "mutation LoginScreenMutation(\n  $token: String!\n) {\n  login(token: $token) {\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "3520e9431d64c0d51591a1ea6b01c445";

export default node;
