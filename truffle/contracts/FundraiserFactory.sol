// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
	Fundraiser[] private _fundraisers;
	uint256 constant maxLimit = 20;//fundraisers関数から返す[最大数]

	event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

	function createFundraiser(
		string memory name,
		string memory url,
		string memory imgURL,
		string memory description,
		address payable beneficiary
	) public {
		Fundraiser newFundraiser = new Fundraiser(
			name, url, imgURL, description, beneficiary, msg.sender
		);
		_fundraisers.push(newFundraiser);
		emit FundraiserCreated(newFundraiser, newFundraiser.owner());
	}

	function fundraisersCount() public view returns(uint256) {
		return _fundraisers.length;
	}

	function fundraisers(uint256 limit, uint256 offset) public view returns(Fundraiser[] memory collections) {
		require(offset <= fundraisersCount(), "offset out of bounds");
		uint256 size = fundraisersCount() - offset;
		if (size > limit)
			size = limit;
		if (size > maxLimit)
			size = maxLimit;
		collections = new Fundraiser[](size);

		for (uint256 i = 0; i < size; i++) {
			collections[i] = _fundraisers[offset + i];
		}
		return collections;
	}
}