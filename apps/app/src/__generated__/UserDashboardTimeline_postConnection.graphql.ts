/**
 * @generated SignedSource<<ec15c479babd1b9f3547e0390ee2ae68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserDashboardTimeline_postConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly awesomeNum: number;
      readonly body: string;
      readonly createdAt: any;
      readonly goodNum: number;
      readonly greatNum: number;
      readonly id: string | null;
      readonly user: {
        readonly iconUrl: string | null;
        readonly id: string | null;
        readonly name: string;
      } | null;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "UserDashboardTimeline_postConnection";
};
export type UserDashboardTimeline_postConnection$key = {
  readonly " $data"?: UserDashboardTimeline_postConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserDashboardTimeline_postConnection">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserDashboardTimeline_postConnection",
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "body",
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
              "selections": [
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QueryPostConnection_Connection",
  "abstractKey": null
};
})();

(node as any).hash = "5f97c60034db3b06957d73aec69c0816";

export default node;
