// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
	Fundraiser[] private _fundraisers;

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
}