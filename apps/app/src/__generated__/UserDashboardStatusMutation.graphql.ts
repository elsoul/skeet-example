/**
 * @generated SignedSource<<3691f7d4e9b6aab62abd17097b7d5ab5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserDashboardStatusMutation$variables = {};
export type UserDashboardStatusMutation$data = {
  readonly airdrop: {
    readonly pubkey: string;
    readonly sol: number;
  } | null;
};
export type UserDashboardStatusMutation = {
  response: UserDashboardStatusMutation$data;
  variables: UserDashboardStatusMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pubkey",
  "storageKey": null
},
v1 = {
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
    "name": "UserDashboardStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserWallets",
        "kind": "LinkedField",
        "name": "airdrop",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserDashboardStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserWallets",
        "kind": "LinkedField",
        "name": "airdrop",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8776935d703d9cce3f45d2f8ee2616d9",
    "id": null,
    "metadata": {},
    "name": "UserDashboardStatusMutation",
    "operationKind": "mutation",
    "text": "mutation UserDashboardStatusMutation {\n  airdrop {\n    pubkey\n    sol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d5c7d0e32b4afce4a0257b690008fa06";

export default node;
