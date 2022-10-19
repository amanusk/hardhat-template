# Solidity Template

This is a basic hardhat template to get you started writing and compiling contract.
The template is configured with some sensible defaults but tries to stay minimal.
It comes with most sensible plugins already installed via the suggested `hardhat-toolbox`.

- [Hardhat](https://github.com/nomiclabs/hardhat): compile and run the smart contracts on a local development network
- [TypeChain](https://github.com/ethereum-ts/TypeChain): generate TypeScript types for smart contracts
- [Ethers](https://github.com/ethers-io/ethers.js/): renowned Ethereum library and wallet implementation

Use the template by clicking the "Use this template" button at the top of the page.

## Usage

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### Test

Run the tests:

```sh
$ yarn test
```

### Deploy contract to network (requires Mnemonic and Infura API key)

```
npx hardhat run --network rinkeby ./scripts/deploy.ts
```

### Validate a contract with etherscan (requires API key)

```
npx hardhat verify --network <network> <DEPLOYED_CONTRACT_ADDRESS> "Constructor argument 1"
```

## Thanks

If you like it than you shoulda put a start ⭐ on it

Twitter: [@amanusk\_](https://twitter.com/amanusk_)

## License

MIT
