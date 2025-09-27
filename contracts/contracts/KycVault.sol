// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract KycVault {
    // Data structure for KYC records
    struct KycRecord {
        bytes32 documentHash;    // keccak256 fingerprint of the document
        address issuer;          // who issued the credential
        uint64 issuedAt;        // timestamp when issued
        bool valid;             // is the record valid
    }
    
    // Mapping: holder address => KYC record
    mapping(address => KycRecord) public kycRecords;
    
    // Mapping: holder => verifier => consent status
    mapping(address => mapping(address => bool)) public consent;
    
    // Events
    event KycIssued(
        address indexed holder,
        address indexed issuer,
        bytes32 documentHash,
        uint64 issuedAt
    );
    
    event ConsentGranted(
        address indexed holder,
        address indexed verifier
    );
    
    event ConsentRevoked(
        address indexed holder,
        address indexed verifier
    );
    
    event KycRevoked(
        address indexed holder,
        address indexed issuer
    );
    
    // Modifiers
    modifier onlyIssuer(address holder) {
        require(
            kycRecords[holder].issuer == msg.sender,
            "Only the issuer can perform this action"
        );
        _;
    }
    
    modifier hasValidKyc(address holder) {
        require(
            kycRecords[holder].valid && kycRecords[holder].documentHash != bytes32(0),
            "Holder does not have valid KYC"
        );
        _;
    }
    
    /**
     * @dev Issue a KYC credential for a holder
     * @param holder Address of the person being verified
     * @param documentHash keccak256 hash of the KYC document
     */
    function issueKyc(address holder, bytes32 documentHash) external {
        require(holder != address(0), "Invalid holder address");
        require(documentHash != bytes32(0), "Invalid document hash");
        require(
            kycRecords[holder].documentHash == bytes32(0),
            "KYC already exists for this holder"
        );
        
        kycRecords[holder] = KycRecord({
            documentHash: documentHash,
            issuer: msg.sender,
            issuedAt: uint64(block.timestamp),
            valid: true
        });
        
        emit KycIssued(holder, msg.sender, documentHash, uint64(block.timestamp));
    }
    
    /**
     * @dev Grant consent to a verifier
     * @param verifier Address of the verifier to grant access to
     */
    function grantConsent(address verifier) external hasValidKyc(msg.sender) {
        require(verifier != address(0), "Invalid verifier address");
        require(verifier != msg.sender, "Cannot grant consent to yourself");
        
        consent[msg.sender][verifier] = true;
        emit ConsentGranted(msg.sender, verifier);
    }
    
    /**
     * @dev Revoke consent from a verifier
     * @param verifier Address of the verifier to revoke access from
     */
    function revokeConsent(address verifier) external {
        require(verifier != address(0), "Invalid verifier address");
        
        consent[msg.sender][verifier] = false;
        emit ConsentRevoked(msg.sender, verifier);
    }
    
    /**
     * @dev Revoke KYC (only by issuer)
     * @param holder Address of the holder whose KYC to revoke
     */
    function revokeKyc(address holder) external onlyIssuer(holder) {
        kycRecords[holder].valid = false;
        emit KycRevoked(holder, msg.sender);
    }
    
    /**
     * @dev Verify if a document hash matches the stored KYC and consent is granted
     * @param holder Address of the KYC holder
     * @param documentHash Hash of the document to verify
     * @return isValid True if hash matches and consent is granted
     */
    function verifyKyc(address holder, bytes32 documentHash) 
        external 
        view 
        returns (bool isValid) 
    {
        // Check if holder has valid KYC
        if (!kycRecords[holder].valid || kycRecords[holder].documentHash == bytes32(0)) {
            return false;
        }
        
        // Check if consent is granted to the caller (verifier)
        if (!consent[holder][msg.sender]) {
            return false;
        }
        
        // Check if document hash matches
        return kycRecords[holder].documentHash == documentHash;
    }
    
    /**
     * @dev Get KYC record details (public info only)
     * @param holder Address of the KYC holder
     * @return issuer Address of the issuer
     * @return issuedAt Timestamp when issued
     * @return valid Whether the KYC is valid
     */
    function getKycRecord(address holder) 
        external 
        view 
        returns (address issuer, uint64 issuedAt, bool valid) 
    {
        KycRecord memory record = kycRecords[holder];
        return (record.issuer, record.issuedAt, record.valid);
    }
    
    /**
     * @dev Check if consent is granted
     * @param holder Address of the KYC holder
     * @param verifier Address of the verifier
     * @return hasConsent True if consent is granted
     */
    function hasConsent(address holder, address verifier) 
        external 
        view 
        returns (bool hasConsent) 
    {
        return consent[holder][verifier];
    }
    
    /**
     * @dev Get the document hash (only for the holder or issuer)
     * @param holder Address of the KYC holder
     * @return documentHash The stored document hash
     */
    function getDocumentHash(address holder) 
        external 
        view 
        returns (bytes32 documentHash) 
    {
        require(
            msg.sender == holder || msg.sender == kycRecords[holder].issuer,
            "Only holder or issuer can view document hash"
        );
        return kycRecords[holder].documentHash;
    }
}