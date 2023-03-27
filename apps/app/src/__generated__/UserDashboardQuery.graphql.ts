/**
 * @generated SignedSource<<df2c10c47a29a94783951ec951702578>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserDashboardQuery$variables = {};
export type UserDashboardQuery$data = {
  readonly me: {
    readonly email: string;
    readonly iconUrl: string | null;
    readonly name: string;
    readonly uid: string;
    readonly userWallets: ReadonlyArray<{
      readonly pubkey: string;
      readonly sol: number;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"UserTransactionHistory_user">;
  } | null;
  readonly postConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"UserDashboardTimeline_postConnection">;
  } | null;
};
export type UserDashboardQuery = {
  response: UserDashboardQuery$data;
  variables: UserDashboardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uid",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iconUrl",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pubkey",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sol",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = [
  (v7/*: any*/),
  (v1/*: any*/),
  (v3/*: any*/)
],
v10 = [
  (v7/*: any*/),
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
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "fromUser",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "toUser",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserDashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserWallets",
            "kind": "LinkedField",
            "name": "userWallets",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserTransactionHistory_user"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "QueryPostConnection_Connection",
        "kind": "LinkedField",
        "name": "postConnection",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserDashboardTimeline_postConnection"
          }
        ],
        "storageKey": "postConnection(first:20)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserDashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserWallets",
            "kind": "LinkedField",
            "name": "userWallets",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SolanaTransfer",
            "kind": "LinkedField",
            "name": "toTransfers",
            "plural": true,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SolanaTransfer",
            "kind": "LinkedField",
            "name": "fromTransfers",
            "plural": true,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "QueryPostConnection_Connection",
        "kind": "LinkedField",
        "name": "postConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "body",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "goodNum",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "greatNum",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "awesomeNum",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "postConnection(first:20)"
      }
    ]
  },
  "params": {
    "cacheID": "53be00eba60d9cacbfea866c9373aa59",
    "id": null,
    "metadata": {},
    "name": "UserDashboardQuery",
    "operationKind": "query",
    "text": "query UserDashboardQuery {\n  me {\n    uid\n    name\n    email\n    iconUrl\n    userWallets {\n      pubkey\n      sol\n      id\n    }\n    ...UserTransactionHistory_user\n    id\n  }\n  postConnection(first: 20) {\n    ...UserDashboardTimeline_postConnection\n  }\n}\n\nfragment UserDashboardTimeline_postConnection on QueryPostConnection_Connection {\n  edges {\n    node {\n      id\n      body\n      createdAt\n      goodNum\n      greatNum\n      awesomeNum\n      user {\n        id\n        name\n        iconUrl\n      }\n    }\n  }\n}\n\nfragment UserTransactionHistory_user on User {\n  toTransfers {\n    id\n    amountLamport\n    signature\n    createdAt\n    fromUser {\n      id\n      name\n      iconUrl\n    }\n    toUser {\n      id\n      name\n      iconUrl\n    }\n  }\n  fromTransfers {\n    id\n    amountLamport\n    signature\n    createdAt\n    fromUser {\n      id\n      name\n      iconUrl\n    }\n    toUser {\n      id\n      name\n      iconUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f39e21eedb73265ddf98e1b41644de7";

export default node;
