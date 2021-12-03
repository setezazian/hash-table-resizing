# Hash Table Resizing

Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
Be sure to handle hashing collisions correctly.

- Set your hash table up to double the storage limit as
soon as the total number of items stored is greater than
3/4th of the number of slots in the storage array.
- Resize by half whenever utilization drops below 1/4.
