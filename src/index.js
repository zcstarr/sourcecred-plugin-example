// @flow
import "core-js/stable";
import "regenerator-runtime/runtime";
import {Plugin} from "sourcecred/src/api/plugin";
import type {PluginDeclaration} from "sourcecred/src/analysis/pluginDeclaration";
import {
  MappedReferenceDetector,
  type ReferenceDetector,
} from "sourcecred/src/core/references";
import {coerce, nameFromString} from "sourcecred/src/core/identity/name";
import {declaration, nodePrefix} from "./declaration";
import {type NodeAddressT, NodeAddress} from "sourcecred/src/core/graph";
import {type IdentityProposal} from "sourcecred/src/core/ledger/identityProposal";
import {
  empty as emptyWeightedGraph,
  type WeightedGraph,
} from "sourcecred/src/core/weightedGraph";

export type CustomAddress = string;

function nodeAddressForCustomAddress(address: CustomAddress): NodeAddressT {
  return NodeAddress.append(nodePrefix, address);
}

function createIdentity(address: CustomAddress): IdentityProposal {
  const alias = {
    description: address,
    address: nodeAddressForCustomAddress(address),
  };

  return {
    pluginName: nameFromString("test_custom_identity"),
    name: coerce(address),
    type: "USER",
    alias,
  };
}

class MyTestIdentityPlugin implements Plugin {
  async declaration(): Promise<PluginDeclaration> {
    return declaration;
  }

  async load(): Promise<void> {
    return;
  }

  async referenceDetector(): Promise<ReferenceDetector> {
    const emptyReferenceDetector = new MappedReferenceDetector(new Map());
    return emptyReferenceDetector;
  }

  async identities(): Promise<$ReadOnlyArray<IdentityProposal>> {
    return [createIdentity("aBBaddAMyMockIdentityAddress")];
  }

  async graph(): Promise<WeightedGraph> {
    return emptyWeightedGraph();
  }
}

exports.default = MyTestIdentityPlugin
/*
["@babel/plugin-transform-modules-commonjs",{
              importInterop: "babel"
            }],
            */