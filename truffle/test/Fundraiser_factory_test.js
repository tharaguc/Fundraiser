const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

contract("FundraiserFactory: deployment", () => {
	it("has bee deployed", async () => {
		const fundraiserFactory = FundraiserFactoryContract.deployed();
		assert(fundraiserFactory, "fundraiserFactory was not deployed");
	});
});

contract("fundraiserFactory: createFundraiser", (accounts) => {
	let fundraiserFactory;
	const name = "Beneficiary Name";
	const url = "beneficiary.org";
	const imgURL = "https://placekitten.com/600/350";
	const description = "Hello, give me the money";
	const beneficiary = accounts[1];

	it("increments the fundraiserCount", async () => {
		fundraiserFactory = await FundraiserFactoryContract.deployed();
		const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
		await fundraiserFactory.createFundraiser( name, url, imgURL, description, beneficiary );
		const newFundraisersCount = await fundraiserFactory.fundraisersCount();
		assert.equal(1, newFundraisersCount - currentFundraisersCount, "should increment by 1");
	});
	it("emits the FundraiserCreated event", async () => {
		fundraiserFactory = await FundraiserFactoryContract.deployed();
		const tx = await fundraiserFactory.createFundraiser( name, url, imgURL, description, beneficiary );
		const expected = "FundraiserCreated";
		const actual = tx.logs[0].event;
		assert.equal(actual, expected, "events should match");
	});
});