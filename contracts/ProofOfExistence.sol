// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProofOfExistence {

    struct Proof {
        uint256 timestamp;
        address owner;
    }

    mapping(bytes32 => Proof) private proofs;

    event Notarized(
        bytes32 indexed documentHash,
        address indexed owner,
        uint256 timestamp
    );

    function notarize(bytes32 documentHash) external {
        require(proofs[documentHash].timestamp == 0, "Document already notarized");
        
        proofs[documentHash] = Proof({
            timestamp: block.timestamp,
            owner: msg.sender
        });

        emit Notarized(documentHash, msg.sender, block.timestamp);
    }

    function getProof(bytes32 documentHash) external view returns (uint256, address) {
        return (proofs[documentHash].timestamp, proofs[documentHash].owner);
    }

}