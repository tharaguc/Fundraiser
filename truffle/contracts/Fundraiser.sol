// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fundraiser is Ownable {
	using SafeMath for uint256;

	uint256 public totalDonations;
	uint256 public donationsCount;

	string public name;
	string public url;
	string public imgURL;
	string public description;

	address payable public beneficiary;
	address public custodian;

	struct Donation {
		uint256 value;
		uint256 date;
	}
	mapping(address => Donation[]) private _donations;

	constructor(
		string memory _name,
		string memory _url,
		string memory _imgURL,
		string memory _description,
		address payable _beneficiary,
		address _custodian
	) {
		name = _name;
		url = _url;
		imgURL = _imgURL;
		description = _description;
		beneficiary = _beneficiary;
		transferOwnership(_custodian);
	}

	event DonationReceived(address indexed donor, uint256 value);
	event Withdraw(uint256 amount);

	function setBeneficiary(address payable _beneficiary) public onlyOwner {
		beneficiary = _beneficiary;
	}

	function myDonationsCount() public view returns(uint256) {
		return _donations[msg.sender].length;
	}


	function donate() public payable {
		Donation memory d = Donation({
			value: msg.value,
			date: block.timestamp
		});
		_donations[msg.sender].push(d);
		totalDonations = totalDonations.add(msg.value);
		donationsCount++;
		emit DonationReceived(msg.sender, msg.value);
	}

	function myDonations() public view returns(uint256[] memory values, uint256[] memory dates) {
		uint256 count = myDonationsCount();
		values = new uint256[](count);
		dates = new uint256[](count);

		for (uint256 i = 0; i < count; i++) {
			Donation storage d = _donations[msg.sender][i];
			values[i] = d.value;
			dates[i] = d.date;
		}
		return (values, dates);
	}

	function withdraw() public onlyOwner {
		uint256 balance = address(this).balance;
		beneficiary.transfer(balance);
		emit Withdraw(balance);
	}

	fallback () external payable {
		totalDonations = totalDonations.add(msg.value);
		donationsCount++;
	}

	receive () external payable {
		totalDonations = totalDonations.add(msg.value);
		donationsCount++;
	}
}