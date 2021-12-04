const makeHashTable = require('./index');

describe('Test the implementation of hash table resizing', () => {
  it('should retrieve an item that was inserted', () => {
    const table = makeHashTable();
    table.insert('Shirin', 'the best');
    expect(table.retrieve('Shirin')).toBe('the best');
  });

  it('should return undefined when retrieving an item that was not inserted', () => {
    const table = makeHashTable();
    expect(table.retrieve('Shirin')).toBe(undefined);
  });

  it('should return undefined when retrieving an item that was deleted', () => {
    const table = makeHashTable();
    table.insert('Shirin', 'the best');
    table.remove('Shirin');
    expect(table.retrieve('Shirin')).toBe(undefined);
  });

  it('should double the storage limit when the total number of items stored is greater than 3/4th of the number of slots in the storage array', () => {
    const table = makeHashTable();
    table.insert('Shirin', 'the best');
    table.insert('Lucy', 'is tall');
    table.insert('Max', '22');
    expect(table.storageLimit()).toBe(8);
  });

  it('should half the storage limit whenever utilization drops below 1/4', () => {
    const table = makeHashTable();
    table.insert('Shirin', 'the best');
    table.insert('Lucy', 'is tall');
    table.remove('Lucy');
    expect(table.storageLimit()).toBe(2);
  });
});
