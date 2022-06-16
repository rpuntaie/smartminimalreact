const smartcontract = artifacts.require("smartcontract");
contract('Test', () => {
    it('smart contract test', async function () {
        const sc = await smartcontract.deployed();
        await sc.setn(10);
        assert.equal(await sc.n.call(), 10);
    });
});
