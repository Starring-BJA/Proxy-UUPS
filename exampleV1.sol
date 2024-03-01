// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ExampleV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable{
    uint public x;

    function initialize(address initialOwner, uint number) initializer public {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        x = number;
    }

    function setNumber(uint num) public{
        x = num;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}