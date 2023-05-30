# partial-private-collectibles
Allows users to optionally provide read access to NFT content for collectibles on new transfer. Using a backend relayer to act as a gateway in front of the transaction call, you can pull from private off-chain data to upload encrypted - via multiple keys - media content. With the use of relayed transfer function, allows there to be a state update for encrypted data to match the public keys for new contacts to share with. 

# privacy drawbacks
- there would be no way for people & their contacts that previously own an nft, to unview content
- its also not possible to view how many people previously had access
- (optional) if enabling post-reveal of metadata, can follow ownership up the chain, containing a dam-like component of memetic energy for current holders

# privacy benefits
- still contains properties of knowing: time of acquisition and inclusion in collection group - which can be useful for creating exclusive experiences
- (optional) on acquisition of ownership of NFT, user holds trust, or, belief in partial private chain ownership -> can create positive community dynamic

# tech
- sequence
- express 
- openpgp

# steps
1. Use public keys to create encrypted message
2. Read encrypted data using public key

# futures
- creating safe metaverses

# protocol
- it might be useful to distinguish an ERC721 that is public, and one that is partial private, with backwards compatibility to ERC721s