export const PROOF_OF_EXISTENCE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "documentHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Notarized",
    type: "event",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "documentHash", type: "bytes32" },
    ],
    name: "getProof",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "documentHash", type: "bytes32" },
    ],
    name: "notarize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const CONTRACT_ADDRESS = "0xb2Ab84E4734dD44515e3C1acffDF220e3Ab35bD8";
