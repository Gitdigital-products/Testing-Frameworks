const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
  const [owner, user] = accounts;
  let simpleStorageInstance;

  beforeEach(async () => {
    simpleStorageInstance = await SimpleStorage.new({ from: owner });
  });

  it("should store and retrieve a value", async () => {
    const value = 42;
    
    await simpleStorageInstance.set(value, { from: owner });
    const storedValue = await simpleStorageInstance.get();
    
    assert.equal(storedValue.toString(), value.toString(), "Value not stored correctly");
  });

  it("should emit ValueChanged event", async () => {
    const value = 100;
    
    const receipt = await simpleStorageInstance.set(value, { from: owner });
    
    assert.equal(receipt.logs.length, 1, "Event not emitted");
    assert.equal(receipt.logs[0].event, "ValueChanged", "Wrong event emitted");
    assert.equal(receipt.logs[0].args.newValue.toString(), value.toString(), "Wrong value in event");
  });
});
