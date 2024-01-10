pragma solidity >=0.4.22 <0.9.0;

enum Status {
    InProgress,
    Completed
}

struct Record {
    address payable sellerAddr;
    string sellerId;
    address payable buyerAddr;
    string buyerId;
    uint256 value;
    Status status;
}

contract index {
    mapping(string => Record) public records;
    string[] public recordKeys;

    event DepositCreated(
        string listingId,
        string buyerId,
        string sellerId,
        address sellerAddr
    );
    event DepositTransfered(address receiver, uint256 amount);

    function saveDeposit(
        string memory listingId,
        string memory buyerId,
        string memory sellerId,
        address sellerAddr
    ) external payable {
        string memory key = getRecordKeyInTemplate(listingId, buyerId);
        Record storage newRecord = records[key];
        newRecord.sellerAddr = payable(sellerAddr);
        newRecord.sellerId = sellerId;
        newRecord.buyerAddr = payable(msg.sender);
        newRecord.buyerId = buyerId;
        newRecord.value = msg.value;
        newRecord.status = Status.InProgress;

        recordKeys.push(key);
        emit DepositCreated(listingId, buyerId, sellerId, sellerAddr);
    }

    function transfer(
        string memory listingId,
        string memory buyerId,
        address receiver
    ) external payable {
        string memory key = getRecordKeyInTemplate(listingId, buyerId);
        Record storage record = records[key];

        if (record.status == Status.InProgress) {
            payable(receiver).transfer(record.value);
            record.status = Status.Completed;
            emit DepositTransfered(receiver, record.value);
        }
    }

    // function confirmDeposit(
    //     string memory listingId,
    //     string memory buyerId
    // ) public {
    //     string memory key = getRecordKeyInTemplate(listingId, buyerId);
    //     Record storage record = records[key];
    //     record.status = Status.Confirmed;
    // }

    function getDepositStatus(
        string memory listingId,
        string memory buyerId
    ) public view returns (Status) {
        string memory key = getRecordKeyInTemplate(listingId, buyerId);
        Record memory record = records[key];
        return record.status;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getNumberOfRecords() public view returns (uint256) {
        return recordKeys.length;
    }

    function getRecord(
        string memory listingId,
        string memory buyerId
    ) public view returns (Record memory) {
        string memory key = getRecordKeyInTemplate(listingId, buyerId);
        return records[key];
    }

    function getAllRecords() public view returns (Record[] memory) {
        uint256 numberOfRecords = recordKeys.length;
        Record[] memory allRecords = new Record[](numberOfRecords);

        for (uint256 i = 0; i < numberOfRecords; i++) {
            string memory key = recordKeys[i];
            allRecords[i] = records[key];
        }

        return allRecords;
    }

    function getRecordKeyInTemplate(
        string memory listingId,
        string memory buyerId
    ) private pure returns (string memory) {
        return string(abi.encodePacked(listingId, "-", buyerId));
    }
    // enum State {
    //     Created,
    //     Locked,
    //     Release,
    //     Inactive
    // }
    // /// The function cannot be called at the current state.
    // error InvalidState();
    // error InvalidStatus();
    // //   Ony the buyer can call this function
    // error OnlyBuyer();
    // ///  Ony the seller can call this function
    // error OnlySeller();
    // modifier inState(State state_) {
    //     if (state != state_) {
    //         revert InvalidState();
    //     }
    //     _;
    // }
    // modifier inStatus(Status status_) {
    //     if (status != status_) {
    //         revert InvalidStatus();
    //     }
    //     _;
    // }
    // modifier onlyBuyer() {
    //     if (msg.sender != records.buyer) {
    //         revert OnlyBuyer();
    //     }
    //     _;
    // }
    // modifier onlySeller() {
    //     if (msg.sender != seller) {
    //         revert OnlySeller();
    //     }
    //     _;
    // }
    // function confirmPurchase() public payable {
    //     require(msg.value == value, "Please send the purchase amount");
    //     buyer = payable(msg.sender);
    //     state = State.Locked;
    //     status = Status.Packaged;
    // }
    // function declinePurchase()
    //     public
    //     payable
    //     inState(State.Locked)
    //     inStatus(Status.Packaged)
    // {
    //     state = State.Inactive;
    //     status = Status.Cancelled;
    //     buyer.transfer(value / 2);
    //     seller.transfer(getBalance());
    // }
    // function confirmPakaged()
    //     public
    //     onlySeller
    //     inState(State.Locked)
    //     inStatus(Status.Packaged)
    // {
    //     status = Status.Shipped;
    // }
    // function confirmReceived()
    //     public
    //     onlyBuyer
    //     inState(State.Locked)
    //     inStatus(Status.Shipped)
    // {
    //     state = State.Release;
    //     status = Status.Deliveried;
    // }
    // function getBalance() public view returns (uint256) {
    //     return address(this).balance;
    // }
    // function fraudReceived()
    //     public
    //     payable
    //     onlySeller
    //     inState(State.Locked)
    //     inStatus(Status.Shipped)
    // {
    //     state = State.Release;
    //     seller.transfer(value + ((value * 4) / 10));
    //     buyer.transfer(getBalance());
    // }
    // function paySeller()
    //     public
    //     onlySeller
    //     inState(State.Release)
    //     inStatus(Status.Deliveried)
    // {
    //     state = State.Inactive;
    //     seller.transfer(address(this).balance);
    // }
    // Function to convert uint256 to string
}
