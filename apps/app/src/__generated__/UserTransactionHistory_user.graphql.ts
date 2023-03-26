/**
 * @generated SignedSource<<01419b9a1397e7fd190e68cf481a586b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserTransactionHistory_user$data = {
  readonly fromTransfers: ReadonlyArray<{
    readonly amountLamport: number;
    readonly createdAt: any;
    readonly fromUser: {
      readonly iconUrl: string | null;
      readonly id: string | null;
      readonly name: string;
    };
    readonly id: string | null;
    readonly signature: string;
    readonly toUser: {
      readonly iconUrl: string | null;
      readonly id: string | null;
      readonly name: string;
    };
  }>;
  readonly toTransfers: ReadonlyArray<{
    readonly amountLamport: number;
    readonly createdAt: any;
    readonly fromUser: {
      readonly iconUrl: string | null;
      readonly id: string | null;
      readonly name: string;
    };
    readonly id: string | null;
    readonly signature: string;
    readonly toUser: {
      readonly iconUrl: string | null;
      readonly id: string | null;
      readonly name: string;
    };
  }>;
  readonly " $fragmentType": "UserTransactionHistory_user";
};
export type UserTransactionHistory_user$key = {
  readonly " $data"?: UserTransactionHistory_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserTransactionHistory_user">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "iconUrl",
    "storageKey": null
  }
],
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountLamport",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "signature",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createdAt",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "fromUser",
    "plural": false,
    "selections": (v1/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "toUser",
    "plural": false,
    "selections": (v1/*: any*/),
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserTransactionHistory_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SolanaTransfer",
      "kind": "LinkedField",
      "name": "toTransfers",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SolanaTransfer",
      "kind": "LinkedField",
      "name": "fromTransfers",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "6a2cd0f4a3b7431d9dd0e2791641f87c";

export default node;
