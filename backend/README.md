# backend API
- must store original metadata in files on backend to be read
- must have a contacts api for storing keys in a database or onchain (leaning towards central database)

### requirements
- collect(<token_id>, <openpgp_public_keys[]>): pass in tokenID and openpgp key -> lookup key 'to' contacts
- addContact(<wallet_address>,<openpgp_public_keys>): (private held db)
- removeContact(<wallet_address>,<openpgp_public_keys>): (optional)
- contactsByKey:<wallet_address>)

### open question about re-privatization
- creating things that are public, can have irreversible effects as to who has seen something before. if turned on, there are 2 options:
-- 1. allow for re-privatizing again
-- 2. do not allow for re-privatization, keep open 

solution: leaning towards #2. look at typical company market structure and asymmetries, could create voids in matter.

### transfer
- transfer(<from_wallet_address>,<to_wallet_address>,<token_id>,<to_public_keys[]>): pass in tokenID and openpgp key of 'to'

### area of privacy attack
- you can see which nft is not available post a transaction -> must be mixed on a chron, and only remains private on viral, high volume projects

### mixer
- place a bound on either: run every x amount of time, or, if there are batches of 30