export const SINGLETON_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "bytes", name: "_initCode", type: "bytes" },
      { internalType: "bytes32", name: "_salt", type: "bytes32" },
    ],
    name: "deploy",
    outputs: [{ internalType: "address payable", name: "createdContract", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
