//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;
contract smartcontract {
    uint public n = 10;
    function setn(uint _n) public {
        n = _n;
    }
}
