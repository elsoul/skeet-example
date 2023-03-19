/**
 * @generated SignedSource<<a101e337e483741f4a0ff7962d709d0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateUserWalletMutation$variables = {};
export type CreateUserWalletMutation$data = {
  readonly createWallet: {
    readonly pubkey: string;
    readonly sol: number;
  } | null;
};
export type CreateUserWalletMutation = {
  response: CreateUserWalletMutation$data;
  variables: CreateUserWalletMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "name",
    "value": "SkeetExampleDev"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pubkey",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sol",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateUserWalletMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "UserWallets",
        "kind": "LinkedField",
        "name": "createWallet",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": "createWallet(name:\"SkeetExampleDev\")"
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CreateUserWalletMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "UserWallets",
        "kind": "LinkedField",
        "name": "createWallet",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "createWallet(name:\"SkeetExampleDev\")"
      }
    ]
  },
  "params": {
    "cacheID": "0267b6fedf1615b9e8577c7e439f6ec6",
    "id": null,
    "metadata": {},
    "name": "CreateUserWalletMutation",
    "operationKind": "mutation",
    "text": "mutation CreateUserWalletMutation {\n  createWallet(name: \"SkeetExampleDev\") {\n    pubkey\n    sol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "92083fa6241623169e06c611ef63bfd7";

export default node;
