The project was created this way

``` sh
npx create-react-app smartminimalreact -template javascript
cd smartminimalreact
npm install web3

mkdir smartcontract
cd smartcontract
truffle init
# add smartcontract
# add 1_deploy.js (the x_ is needed for ordering)

# to allow abi import add symlink to contracts to src
cd smartminimalreact/src
ln -s ../smartcontract/build/contracts

# modify src/App.js

```

As it exists now one just needs to initialize it with

``` sh
npm install
```

Start

``` sh
ganache-cli
#in another terminal
cd smartcontract
truffle test
truffle migrate
```

Change the contract address `src/App.js`.

In Metamask

- settings / enable test networks
- click at the symbol to the right of the selected localhost network
- import account from ganache-cli

With Metamask also for the local ganache test network
the account needs fund to pay for fee needed in smart contract calls.
Else one can comment the lines using `window.ethereum` in `App.js`.

Then

``` sh
npm start
```

Click again on metamask to connect the previously imported account to the site.

# Deploy

Deploying to a non-test network an account from there to pay the fee for deployment.
Fill in the mnemonic `...` in truffle-config.js,
representing the private key of your account.

``` sh
# change the pass phrase in smartcontract/truffle-config.js
truffle migrate --network smartzeniq
```


