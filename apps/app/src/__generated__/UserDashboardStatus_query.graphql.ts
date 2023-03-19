/**
 * @generated SignedSource<<44421dab568064c726182e488d256cb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserDashboardStatus_query$data = {
  readonly userWalletsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly pubkey: string;
        readonly sol: number;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "UserDashboardStatus_query";
};
export type UserDashboardStatus_query$key = {
  readonly " $data"?: UserDashboardStatus_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserDashboardStatus_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserDashboardStatus_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "QueryUserWalletsConnection_Connection",
      "kind": "LinkedField",
      "name": "userWalletsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserWalletsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserWallets",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "pubkey",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "sol",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "userWalletsConnection(first:1)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "723c2db9ae9c69834db802fd06f200f3";

export default node;
