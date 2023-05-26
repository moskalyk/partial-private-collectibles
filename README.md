# partial-private-collectibles
Allows users to optionally provide read access to NFT content for collectibles on new transfer. Using a backend relayer to act as a gateway in front of the transaction call, you can pull from private off-chain data to upload encrypted - via multiple keys - media content. With the use of relayed transfer function, allows there to be a state update for encrypted data to match the public keys for new contacts to share with. 

# privacy drawbacks
- there would be no way for people & their contacts that previously own an nft, to unview content
- its also not possible to view how many people previously had access

# tech
- sequence
- express 
- openpgp

# steps
1. Use public keys to create encrypted message
2. Read encrypted data using public key

# futures
- creating safe metaverses