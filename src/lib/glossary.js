
export const CATEGORIES = [
  { k: 'basics', label: 'Basics' },
  { k: 'keys', label: 'Keys & wallets' },
  { k: 'tx', label: 'Transactions' },
  { k: 'mining', label: 'Mining' },
  { k: 'network', label: 'Network' },
  { k: 'lightning', label: 'Lightning' },
  { k: 'privacy', label: 'Privacy' },
  { k: 'market', label: 'Markets' },
  { k: 'risk', label: 'Scams & risk' },
];

export const TERMS = [
  { t: '2FA', k: 'risk', alt: 'two factor authentication totp authenticator',
    d: 'A second step beyond a password, usually a six digit code from an app. Codes from an app are far safer than codes by SMS, because a phone number can be taken over by a SIM swap. No honest service ever needs your seed phrase as a second factor.',
    see: [['Offline 2FA code generator', '/tools/2fa'], ['Common scams', '/learn/scams']] },

  { t: '21 million', k: 'basics', alt: 'supply cap max supply hard cap',
    d: 'The maximum number of bitcoin that will ever exist. It is not a policy someone chose to keep; it falls out of the halving schedule, and every full node rejects a block that pays its miner more than the rules allow. The last fraction is expected to be issued around the year 2140.',
    see: [['Halving countdown', '/halving']] },

  { t: 'Address', k: 'basics', alt: 'receiving address bitcoin address',
    d: 'A short string you give someone so they can pay you. It encodes the conditions under which the coins can later be spent, which is why the wallet that generated it is the only one that can spend to it. Addresses are free, and a fresh one for every payment is the normal habit.',
    see: [['Address validator', '/tools/validate'], ['Privacy basics', '/learn/privacy']] },

  { t: 'Address poisoning', k: 'risk', alt: 'look-alike address dust attack',
    d: 'A scam that plants an address in your transaction history whose first and last characters match one you really use, hoping you copy it later by mistake. The middle characters never match, because forging those would mean breaking the cryptography.',
    see: [['Address poisoning explained', '/learn/address-poisoning']] },

  { t: 'Address reuse', k: 'privacy', alt: 'reusing addresses',
    d: 'Receiving more than once to the same address. It works, but it links those payments together permanently in public, and anyone who learns the address belongs to you learns the rest.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Airdrop', k: 'risk', alt: 'free tokens giveaway',
    d: 'Tokens distributed free, usually to promote a project. Bitcoin has never had one. In practice the word is most often seen in scams, where claiming the airdrop requires connecting a wallet or entering a seed phrase.',
    see: [['Common scams', '/learn/scams']] },

  { t: 'Altcoin', k: 'basics', alt: 'alternative coin alts shitcoin',
    d: 'Any cryptocurrency other than bitcoin. Thousands have launched; most have failed, and their failures are usually a matter of abandoned development, collapsed liquidity or the promoters selling out rather than a technical break.',
    see: [['Dead coins', '/obituaries']] },

  { t: 'AML', k: 'risk', alt: 'anti money laundering compliance',
    d: 'Anti money laundering: the rules that require regulated businesses to identify customers and report certain activity. It is the reason exchanges ask for documents, and the reason a deposit can be frozen while a compliance team reviews it.',
    see: [['Frozen deposits explained', '/learn/frozen-deposits']] },

  { t: 'ASIC', k: 'mining', alt: 'application specific integrated circuit miner rig',
    d: 'A chip built to do one job. Bitcoin mining ASICs compute SHA-256 hashes and nothing else, which makes them thousands of times more efficient at it than a general purpose computer, and worthless for anything else.',
    see: [['Mining calculator', '/tools/mining']] },

  { t: 'ATH', k: 'market', alt: 'all time high peak record',
    d: 'All time high: the highest price ever reached. Bitcoin has made a new all time high in several cycles and has also spent years below a previous one, so distance from the high says more about where you are in a cycle than about the network.',
    see: [['All time high', '/ath']] },

  { t: 'Atomic swap', k: 'tx', alt: 'cross chain swap htlc trade',
    d: 'A trade between two chains that either completes for both sides or completes for neither, enforced by matching time locked contracts rather than by a middleman holding the funds.',
    see: [['Swap', '/swap']] },

  { t: 'Base58Check', k: 'keys', alt: 'base58 encoding legacy address',
    d: 'The older encoding used for addresses starting with 1 or 3 and for extended keys. It removes characters that are easy to confuse (zero, capital O, capital I, lowercase l) and appends a checksum so a typo is caught rather than sent.',
    see: [['Address validator', '/tools/validate']] },

  { t: 'Bech32', k: 'keys', alt: 'bc1 segwit address bech32m',
    d: 'The address format used by SegWit, starting bc1q, and in its bech32m variant by Taproot, starting bc1p. It is all one case, has a stronger checksum that can point at which character is wrong, and is cheaper to spend from.',
    see: [['Address validator', '/tools/validate']] },

  { t: 'BIP', k: 'network', alt: 'bitcoin improvement proposal',
    d: 'Bitcoin Improvement Proposal: the numbered document format used to describe a change or a standard. A BIP number is a reference, not an approval; a proposal only matters once software implements it and users run that software.' },

  { t: 'BIP39', k: 'keys', alt: 'mnemonic seed words wordlist',
    d: 'The standard behind the 12 or 24 word seed phrase, including the fixed list of 2,048 words. The words encode the randomness your keys come from, plus a checksum, which is why a mistyped word is usually detected.',
    see: [['Seed phrase tools', '/tools/bip39'], ['Seed backup guide', '/learn/seed-backup']] },

  { t: 'Bitcoin Core', k: 'network', alt: 'core reference client bitcoind',
    d: 'The most widely used full node software, descended directly from the original 2009 release. Running it means you verify every rule for yourself instead of trusting somebody else\'s answer about what happened.',
    see: [['Run a node', '/nodes']] },

  { t: 'Block', k: 'basics', alt: 'blocks',
    d: 'A batch of transactions plus a header that commits to them and to the block before it. Roughly one is found every ten minutes on average, though the actual gaps vary widely because mining is a random search.',
    see: [['Latest blocks', '/blocks']] },

  { t: 'Block height', k: 'basics', alt: 'height block number',
    d: 'How many blocks came before a given block, counting the genesis block as zero. Height is the usual way to refer to a point in the chain, because it is unambiguous in a way that a timestamp is not.',
    see: [['Latest blocks', '/blocks']] },

  { t: 'Block reward', k: 'mining', alt: 'coinbase reward miner reward',
    d: 'What a miner collects for a block: the subsidy of newly issued bitcoin plus the fees of every transaction included. The subsidy halves on schedule, so fees grow into the larger share over time.',
    see: [['Halving countdown', '/halving']] },

  { t: 'Block subsidy', k: 'mining', alt: 'subsidy new coins issuance',
    d: 'The newly created bitcoin part of the block reward. It started at 50 BTC, halves every 210,000 blocks, and stands at 3.125 BTC since the 2024 halving.',
    see: [['Halving countdown', '/halving']] },

  { t: 'Blockchain', k: 'basics', alt: 'chain ledger',
    d: 'The chain of blocks, each one committing to the one before it, which is what makes rewriting old history expensive rather than merely dishonest. In bitcoin it is the public record of every transaction since 2009.' },

  { t: 'Broadcast', k: 'tx', alt: 'publish transaction relay send raw',
    d: 'Handing a signed transaction to the network. Your node passes it to its peers, they pass it on, and within seconds it sits in mempools everywhere waiting to be mined. Broadcasting costs nothing and can be done from any node, not just the wallet that signed.',
    see: [['Broadcast a transaction', '/tools/broadcast']] },

  { t: 'Burn address', k: 'tx', alt: 'unspendable eater address provably unspendable',
    d: 'An address with no known private key, so anything sent to it can never move again. Sometimes used deliberately to destroy coins, and sometimes reached by accident, which is one of the ways bitcoin is permanently lost.' },

  { t: 'Change address', k: 'tx', alt: 'change output',
    d: 'Bitcoin is spent in whole chunks, so a payment usually sends part of the money onward and the remainder back to an address your own wallet controls. That remainder is the change. It is yours, and your wallet handles it automatically.',
    see: [['What is a UTXO', '/learn/utxo']] },

  { t: 'Checksum', k: 'keys', alt: 'error detection',
    d: 'Extra characters that are computed from the rest of a string, so a copy with a typo does not match and gets rejected. It is why a mistyped address is almost always refused by the wallet rather than paid to a stranger.',
    see: [['Address validator', '/tools/validate']] },

  { t: 'Coinbase transaction', k: 'mining', alt: 'coinbase generation transaction',
    d: 'The first transaction in every block, which creates the subsidy and pays the miner. It has no real inputs, and its output cannot be spent until 100 further blocks have been built on top. Nothing to do with the exchange of a similar name.' },

  { t: 'CoinJoin', k: 'privacy', alt: 'mixing collaborative transaction',
    d: 'A transaction several people build together, so the outputs cannot be matched to the inputs by looking at the chain. It breaks the assumption that all inputs of a transaction share one owner, which is the assumption most chain analysis rests on.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Cold storage', k: 'keys', alt: 'cold wallet offline storage air gapped',
    d: 'Keys kept on something that has never touched the internet, so malware on a connected machine cannot reach them. The trade-off is convenience: spending requires a deliberate trip to the offline device.',
    see: [['Self-custody', '/learn/self-custody']] },

  { t: 'Confirmation', k: 'tx', alt: 'confirmations confirmed unconfirmed',
    d: 'One confirmation means your transaction is in a block. Each further block on top is another confirmation, and each one makes reversal more expensive, because an attacker would have to redo that work and outpace the rest of the network.',
    see: [['Confirmations explained', '/learn/confirmations']] },

  { t: 'Consensus', k: 'network', alt: 'consensus rules agreement',
    d: 'The rules every node checks independently, and the state they therefore agree on. Consensus in bitcoin is not a vote; it is what remains when thousands of machines each reject anything that breaks the rules they run.' },

  { t: 'Custodial', k: 'risk', alt: 'custodian third party exchange wallet',
    d: 'Someone else holds the keys and owes you a balance. That is a claim on a company, not possession of bitcoin, and it can be frozen, lost in a bankruptcy or stolen from the custodian.',
    see: [['Frozen deposits explained', '/learn/frozen-deposits'], ['Self-custody', '/learn/self-custody']] },

  { t: 'DCA', k: 'market', alt: 'dollar cost averaging recurring buy',
    d: 'Buying a fixed amount on a fixed schedule instead of trying to pick moments. It does not promise a better result than a single well-timed purchase; it removes the need to time anything, which is where most people do themselves damage.',
    see: [['DCA calculator', '/dca']] },

  { t: 'Derivation path', k: 'keys', alt: 'bip32 path m/84 account path',
    d: 'The route from your seed to one particular key, written like m/84\'/0\'/0\'/0/0. The path decides which addresses a wallet shows, which is why the same seed can look empty in one wallet and correct in another.',
    see: [['Seed recovery', '/tools/seed-recovery']] },

  { t: 'Descriptor', k: 'keys', alt: 'output descriptor wallet descriptor',
    d: 'A compact line that records exactly what a wallet watches: the keys, the script type and the derivation. It removes the guesswork that used to make restoring a wallet in different software a trial and error exercise.' },

  { t: 'Difficulty', k: 'mining', alt: 'mining difficulty target',
    d: 'How hard it currently is to find a block, expressed relative to the easiest possible setting. It is not a fee or a speed limit; it is the size of the haystack miners search.',
    see: [['Difficulty and hashrate', '/hashrate']] },

  { t: 'Difficulty adjustment', k: 'mining', alt: 'retarget 2016 blocks readjustment',
    d: 'Every 2,016 blocks, roughly two weeks, the network measures how long those blocks actually took and resets difficulty so the next stretch averages ten minutes a block. It is the mechanism that keeps issuance on schedule no matter how much or how little mining power shows up.',
    see: [['Difficulty and hashrate', '/hashrate']] },

  { t: 'Double spend', k: 'risk', alt: 'double spending spend twice',
    d: 'Spending the same coins twice. Solving this without a central referee is the problem bitcoin exists to solve, and confirmations are the measure of how thoroughly it has been solved for a given payment.',
    see: [['Double spending explained', '/learn/double-spend']] },

  { t: 'Dust', k: 'tx', alt: 'dust limit uneconomical output',
    d: 'An output so small that spending it would cost more in fees than it is worth. Wallets refuse to create outputs below a dust threshold, and dust already sitting in a wallet is often best left alone.',
    see: [['Consolidation calculator', '/fees/consolidate']] },

  { t: 'ECDSA', k: 'keys', alt: 'elliptic curve signature secp256k1',
    d: 'The signature scheme bitcoin launched with, on the secp256k1 curve. It proves you hold a private key without revealing it. Taproot added Schnorr signatures alongside it.' },

  { t: 'Entropy', k: 'keys', alt: 'randomness random seed generation',
    d: 'The raw randomness a seed is generated from. Real entropy is what makes a key unguessable; a phrase chosen by a human, or generated by a weak source, has been drained repeatedly by attackers who simply searched the small space it came from.',
    see: [['Seed from dice', '/learn/dice-seed']] },

  { t: 'ETF', k: 'market', alt: 'exchange traded fund spot etf',
    d: 'A fund that holds bitcoin and trades as a share on a stock exchange. It gives price exposure inside a brokerage account and gives up everything else: you cannot withdraw the bitcoin, spend it or verify it.',
    see: [['ETFs explained', '/learn/etf']] },

  { t: 'Extended public key', k: 'keys', alt: 'xpub zpub ypub account key',
    d: 'A key that can generate every receiving address in an account without being able to spend from any of them. Useful for watch-only wallets, and a privacy risk if shared carelessly, since the holder can see your entire address history.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Faucet', k: 'basics', alt: 'free bitcoin faucet',
    d: 'A site that gives away tiny amounts of bitcoin. The original 2010 faucet handed out five whole bitcoin per visitor to get the currency into circulation. Modern versions pay fractions of a cent, and many are advertising fronts.',
    see: [['The first faucet', '/history/faucets']] },

  { t: 'Fee', k: 'tx', alt: 'transaction fee miner fee',
    d: 'What you pay a miner to include your transaction. It is set by you, not by the network, and it is paid as whatever is left over after the outputs, which is why a mistake in construction can burn a large fee.',
    see: [['Fees right now', '/fees'], ['Fee calculator', '/fees/calculator']] },

  { t: 'Fee rate', k: 'tx', alt: 'sat/vb sats per vbyte satvb',
    d: 'Fee divided by transaction size, in sats per virtual byte. Miners choose by rate, not by total, so a small transaction paying a high rate is confirmed ahead of a large one paying more in absolute terms.',
    see: [['Fees right now', '/fees']] },

  { t: 'Fiat', k: 'market', alt: 'fiat currency government money',
    d: 'Government issued money whose supply is set by policy: dollars, euros, pounds. The word simply distinguishes that kind of money from bitcoin, whose supply is set by a schedule nobody can change unilaterally.',
    see: [['Converter', '/convert']] },

  { t: 'Fork', k: 'network', alt: 'hard fork soft fork chain split',
    d: 'A change to the rules. A soft fork tightens them, so old nodes still accept the new blocks; a hard fork loosens them, so old nodes reject the new blocks and the chain splits if both sides persist. SegWit and Taproot were soft forks.' },

  { t: 'Full node', k: 'network', alt: 'node validating node',
    d: 'Software that downloads every block and checks every rule itself, keeping no trust in anyone. Running one is what makes the rules yours rather than a service provider\'s, and it needs no mining hardware.',
    see: [['Run a node', '/nodes']] },

  { t: 'Fungibility', k: 'privacy', alt: 'fungible taint blacklist',
    d: 'Whether one unit is treated as equal to any other. Bitcoin is fungible by protocol, but chain surveillance has produced services that treat coins with certain histories differently, which is a policy layer sitting on top of the money.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Genesis block', k: 'basics', alt: 'block 0 first block',
    d: 'The first block, mined on 3 January 2009, with a newspaper headline about bank bailouts embedded in it. Its 50 BTC output is unspendable by a quirk of the original code, so those coins can never move.',
    see: [['The timeline', '/history']] },

  { t: 'Halving', k: 'mining', alt: 'halvening block reward halving',
    d: 'The scheduled event, every 210,000 blocks or roughly four years, where the block subsidy is cut in half. It is how bitcoin\'s issuance falls toward zero without anyone deciding to slow it.',
    see: [['Halving countdown', '/halving']] },

  { t: 'Hardware wallet', k: 'keys', alt: 'signing device hardware signer',
    d: 'A small dedicated device that holds your keys and signs transactions on its own screen, so a compromised computer can ask for a signature but cannot take the key or change where the money goes without you seeing it.',
    see: [['Self-custody', '/learn/self-custody']] },

  { t: 'Hash', k: 'mining', alt: 'hashing sha256 digest',
    d: 'A fixed length fingerprint of some data, easy to compute forward and impractical to reverse. Change one character of the input and the output changes completely, which is what lets a block header commit to everything in the block.',
    see: [['Hash tool', '/tools/hash']] },

  { t: 'Hashrate', k: 'mining', alt: 'hash rate hashing power exahash',
    d: 'How many hashes the whole network computes per second, measured today in exahashes. It is the best available proxy for how much real machinery stands behind the chain, and therefore for how expensive an attack would be.',
    see: [['Hashrate', '/hashrate']] },

  { t: 'HD wallet', k: 'keys', alt: 'hierarchical deterministic bip32',
    d: 'A wallet where every key is derived from one seed, so a single backup covers every address you will ever use. Before this, wallets were files full of unrelated keys that had to be backed up again as they grew.',
    see: [['Seed backup guide', '/learn/seed-backup']] },

  { t: 'HODL', k: 'market', alt: 'hodler hold',
    d: 'Holding rather than trading. The word comes from a drunk, misspelled forum post in 2013 titled I AM HODLING, written during a crash, and it stuck because it described the strategy better than the correct spelling would have.' },

  { t: 'Hot wallet', k: 'keys', alt: 'online wallet mobile wallet',
    d: 'A wallet whose keys live on an internet connected device. Convenient for spending and reasonable for small amounts, in the way a physical wallet in your pocket is reasonable for cash.',
    see: [['Self-custody', '/learn/self-custody']] },

  { t: 'Immutability', k: 'basics', alt: 'immutable irreversible final',
    d: 'The property that recorded history is impractical to change. It is economic rather than magical: rewriting a block means redoing its proof of work and every block after it, faster than the rest of the network extends the honest chain.',
    see: [['Double spending explained', '/learn/double-spend']] },

  { t: 'Input', k: 'tx', alt: 'inputs txin spending',
    d: 'A reference to a previous output being spent, plus the proof that you are allowed to spend it. Every input consumes an entire earlier output, which is why change exists.',
    see: [['What is a UTXO', '/learn/utxo']] },

  { t: 'KYC', k: 'risk', alt: 'know your customer identity verification',
    d: 'Know your customer: the identity documents a regulated business collects before serving you. It ties your name to the coins you withdraw, and those records outlive the company that gathered them.',
    see: [['No-KYC bitcoin', '/learn/no-kyc']] },

  { t: 'Layer 2', k: 'lightning', alt: 'second layer offchain scaling',
    d: 'A system that settles on bitcoin but does most of its work elsewhere, so the base chain records the outcome instead of every step. Lightning is the widely used example.',
    see: [['Lightning explained', '/learn/lightning']] },

  { t: 'Lightning Network', k: 'lightning', alt: 'ln lightning payment channels',
    d: 'A network of payment channels on top of bitcoin. Two parties open a channel with an on-chain transaction, then pay each other instantly and cheaply as often as they like, and only settle to the chain when they close it.',
    see: [['Lightning explained', '/learn/lightning'], ['Lightning tools', '/tools/lightning']] },

  { t: 'Locktime', k: 'tx', alt: 'nlocktime timelock cltv csv',
    d: 'A condition that stops a transaction or an output being spent before a given block height or time. It is the building block behind payment channels, inheritance schemes and escrow arrangements.',
    see: [['Inheritance planning', '/learn/inheritance']] },

  { t: 'Mainnet', k: 'network', alt: 'main network live network',
    d: 'The real bitcoin network, where coins have value. Distinguished from testnet and signet, which exist for development and where the coins are deliberately worthless.' },

  { t: 'Market cap', k: 'market', alt: 'marketcap capitalization',
    d: 'Circulating supply multiplied by the latest price. It is a useful size comparison and a poor measure of money invested, since the last trade sets the multiplier for every coin including those that have not moved in a decade.',
    see: [['Price', '/price']] },

  { t: 'Mempool', k: 'network', alt: 'memory pool pending transactions queue',
    d: 'The set of valid transactions a node has heard about but not yet seen in a block. Every node keeps its own, they differ slightly, and the fee rate at which it clears is what fee estimators are really reading.',
    see: [['Mempool', '/mempool']] },

  { t: 'Merkle tree', k: 'tx', alt: 'merkle root hash tree',
    d: 'A tree of hashes that reduces every transaction in a block to a single root in the header. It lets a light client be shown that one transaction is in a block without downloading the rest of it.' },

  { t: 'Miner', k: 'mining', alt: 'miners mining company',
    d: 'Whoever runs the hardware that searches for valid blocks. Miners choose which valid transactions to include and cannot create invalid ones, because every node would reject the block and the reward with it.',
    see: [['Mining calculator', '/tools/mining']] },

  { t: 'Mining pool', k: 'mining', alt: 'pool pooled mining',
    d: 'A group of miners that combines hashrate and splits rewards, so participants receive small regular payments instead of waiting years for a block alone. Pools direct large amounts of hashrate, which is a recurring centralisation concern.',
    see: [['Hashrate', '/hashrate']] },

  { t: 'Multisig', k: 'keys', alt: 'multi signature 2 of 3 multisignature',
    d: 'Coins that require several keys to spend, for example any two of three. It removes the single point of failure in a seed phrase: losing one key does not lose the money, and stealing one key does not take it.',
    see: [['Inheritance planning', '/learn/inheritance']] },

  { t: 'Node', k: 'network', alt: 'nodes peer',
    d: 'A computer running bitcoin software and talking to peers. A full node verifies everything for itself; a light client asks someone else and trusts the answer.',
    see: [['Run a node', '/nodes']] },

  { t: 'Nonce', k: 'mining', alt: 'number used once',
    d: 'The field in a block header a miner changes to get a different hash. Modern miners exhaust it billions of times a second and vary other fields too, since the nonce alone no longer offers enough room to search.' },

  { t: 'Off-chain', k: 'lightning', alt: 'offchain',
    d: 'Value moving without a bitcoin transaction being recorded: inside Lightning, inside an exchange\'s database, or between two people who simply trust each other. Cheap and fast, and only as final as the arrangement it depends on.',
    see: [['Lightning explained', '/learn/lightning']] },

  { t: 'On-chain', k: 'basics', alt: 'onchain settlement',
    d: 'Recorded in a bitcoin transaction, in a block, verified by every node. Slower and more expensive than the alternatives, and final in a way none of them are.' },

  { t: 'OP_RETURN', k: 'tx', alt: 'op return data output',
    d: 'A script that makes an output provably unspendable, used to attach a small amount of data to a transaction without leaving junk in the set of spendable outputs every node must keep in memory.' },

  { t: 'Ordinals', k: 'tx', alt: 'inscriptions nft brc-20',
    d: 'A convention for numbering individual satoshis and attaching data to them, which produced a wave of images and tokens stored in bitcoin blocks. Contested: to some it is a legitimate use of blockspace paid for at market rates, to others it is congestion.' },

  { t: 'Orphan block', k: 'mining', alt: 'stale block reorg orphan',
    d: 'A valid block that lost the race, because another block at the same height became part of the longer chain. Its transactions return to the mempool and are almost always mined again immediately. The miner gets nothing.' },

  { t: 'Output', k: 'tx', alt: 'outputs txout vout',
    d: 'A chunk of bitcoin with conditions attached that say who can spend it. Every payment creates new outputs and destroys the ones it consumes.',
    see: [['What is a UTXO', '/learn/utxo']] },

  { t: 'Paper wallet', k: 'keys', alt: 'printed key',
    d: 'A private key printed on paper. Popular in the early years and now discouraged: printers cache documents, the format encourages spending the whole balance at once, and the generators involved were a repeated source of theft.',
    see: [['Seed backup guide', '/learn/seed-backup']] },

  { t: 'Passphrase', k: 'keys', alt: '25th word bip39 passphrase extra word',
    d: 'An extra word or sentence added to a seed phrase, producing a completely different wallet. It protects a found backup, and it is unforgiving: there is no recovery, and a wrong passphrase silently opens an empty wallet rather than reporting an error.',
    see: [['Seed backup guide', '/learn/seed-backup']] },

  { t: 'Peer-to-peer', k: 'network', alt: 'p2p peer to peer',
    d: 'Participants connecting directly rather than through a central server. In bitcoin, no node is privileged, and any node can be replaced by another without the network noticing.' },

  { t: 'Private key', k: 'keys', alt: 'privkey secret key',
    d: 'The secret that authorises spending. Whoever holds it controls the coins, completely and irreversibly. It is a number, which is why it can be written down, memorised, split, or stolen by anything that can read your screen.',
    see: [['Self-custody', '/learn/self-custody']] },

  { t: 'Proof of reserves', k: 'risk', alt: 'attestation reserves audit',
    d: 'A custodian demonstrating it holds the coins it owes. Done properly it proves control of the assets and accounts for the liabilities; most published versions cover only the first half, which is the half that was never really in doubt.',
    see: [['Frozen deposits explained', '/learn/frozen-deposits']] },

  { t: 'Proof of work', k: 'mining', alt: 'pow hashcash',
    d: 'Making a valid block require an amount of computation that cannot be faked or shortcut. It converts electricity into a claim on history, so rewriting the past costs real resources rather than a signature.',
    see: [['Mining explained', '/learn/mining']] },

  { t: 'Proof of stake', k: 'mining', alt: 'pos staking',
    d: 'An alternative used by other chains, where the right to produce blocks comes from holding the chain\'s own coin rather than from doing work. Bitcoin does not use it, and the difference in what secures the ledger is the central disagreement between the designs.' },

  { t: 'Pruned node', k: 'network', alt: 'pruning disk space',
    d: 'A full node that verifies everything and then discards old block data it no longer needs, running in a few gigabytes instead of hundreds. It gives up the ability to serve history to other nodes, not the ability to check the rules.',
    see: [['Run a node', '/nodes']] },

  { t: 'PSBT', k: 'tx', alt: 'partially signed bitcoin transaction',
    d: 'A standard file format for a transaction that is not finished being signed, so it can be passed between an online wallet, an offline signer and a co-signer without any of them holding all the pieces.',
    see: [['Decode a transaction', '/tools/decode']] },

  { t: 'Public key', k: 'keys', alt: 'pubkey',
    d: 'The half of a key pair that can be shared. It is derived from the private key in one direction only, which is why publishing it, or an address built from it, gives nothing away.' },

  { t: 'Pump and dump', k: 'risk', alt: 'market manipulation pumping',
    d: 'Organisers accumulate a thin asset quietly, promote it loudly, and sell into the buying they created. The mechanics are old and illegal in regulated markets; in unregulated ones they are run openly in group chats.',
    see: [['Common scams', '/learn/scams']] },

  { t: 'RBF', k: 'tx', alt: 'replace by fee fee bump stuck transaction',
    d: 'Replace by fee: broadcasting a new version of an unconfirmed transaction with a higher fee, so miners take the replacement. It is the standard cure for a transaction stuck at a fee rate the market moved past.',
    see: [['Stuck transaction help', '/tx/stuck']] },

  { t: 'Reorg', k: 'network', alt: 'reorganisation reorganization chain reorg',
    d: 'When a competing chain becomes longer, and nodes switch to it, undoing the blocks they had accepted. One block reorgs happen naturally every few weeks; deep ones do not happen by accident.',
    see: [['Double spending explained', '/learn/double-spend']] },

  { t: 'Rug pull', k: 'risk', alt: 'exit scam',
    d: 'The people behind a project take the money and leave. Common in tokens and yield schemes, where withdrawing the pooled funds is a single transaction the founders can make at any time.',
    see: [['Common scams', '/learn/scams'], ['Dead coins', '/obituaries']] },

  { t: 'Satoshi', k: 'basics', alt: 'sat sats unit',
    d: 'The smallest unit bitcoin can record: one hundred millionth of a bitcoin. Prices for small purchases are increasingly quoted in sats, because the decimals in a bitcoin price stop being readable.',
    see: [['Sats converter', '/sats']] },

  { t: 'Satoshi Nakamoto', k: 'basics', alt: 'creator inventor satoshi nakamoto',
    d: 'The name on the 2008 whitepaper and the first releases. Active until late 2010, then gone, leaving the project to others and roughly a million bitcoin untouched. Whether it was one person remains unknown.',
    see: [['Who is Satoshi', '/learn/who-is-satoshi']] },

  { t: 'Schnorr signature', k: 'keys', alt: 'schnorr bip340',
    d: 'The signature scheme added by Taproot. Its useful property is that several signatures can be combined into one, so a multisig spend can look and cost the same as an ordinary single signature spend.' },

  { t: 'Script', k: 'tx', alt: 'bitcoin script locking script',
    d: 'The small stack based language that expresses the conditions on an output. Deliberately limited, with no loops, so the cost of validating any transaction is bounded and predictable.' },

  { t: 'Seed phrase', k: 'keys', alt: 'recovery phrase mnemonic backup 12 words 24 words',
    d: 'The 12 or 24 words your entire wallet can be rebuilt from. Anyone who reads them owns the coins. No legitimate person, company, wallet or support agent ever needs them, which makes any request for them a theft in progress.',
    see: [['Seed backup guide', '/learn/seed-backup'], ['Seed tools', '/tools/bip39']] },

  { t: 'SegWit', k: 'tx', alt: 'segregated witness bc1q',
    d: 'A 2017 upgrade that moved signature data into a separate part of the transaction. It fixed transaction malleability, which made payment channels practical, and it lowered fees for the wallets that adopted it.' },

  { t: 'Self-custody', k: 'keys', alt: 'non custodial your keys',
    d: 'Holding the keys yourself, so no company can freeze, lend, lose or misreport your coins. It moves the risk from a counterparty to your own procedures, which is a trade rather than a removal of risk.',
    see: [['Self-custody', '/learn/self-custody']] },

  { t: 'SHA-256', k: 'mining', alt: 'sha256 hash function',
    d: 'The hash function bitcoin uses for mining and for committing to data. Published by the NSA in 2001, standard, widely analysed, and with no practical break in its collision or preimage resistance.',
    see: [['Hash tool', '/tools/hash']] },

  { t: 'Sidechain', k: 'network', alt: 'sidechains pegged chain',
    d: 'A separate chain with its own rules, where coins are held on bitcoin while a representation circulates elsewhere. The security depends on whoever guards the peg, not on bitcoin mining.' },

  { t: 'Signature', k: 'keys', alt: 'signing sign message',
    d: 'Proof produced with a private key that a specific message or transaction was authorised, verifiable by anyone holding only the public key. Signing a message is also how someone proves control of an address without spending from it.',
    see: [['Verify a signed message', '/tools/verify-message']] },

  { t: 'SIM swap', k: 'risk', alt: 'sim swapping port out phone takeover',
    d: 'An attacker persuades a mobile carrier to move your number to their SIM, then receives your SMS codes and password resets. It is the reason SMS is the weakest form of two factor authentication.',
    see: [['Offline 2FA', '/tools/2fa']] },

  { t: 'Stablecoin', k: 'market', alt: 'usdt usdc tether',
    d: 'A token that aims to hold a fixed value, usually one dollar, normally by an issuer holding reserves. Useful for moving dollars quickly, and a claim on that issuer: several have broken their peg, and issuers can freeze balances.' },

  { t: 'Taproot', k: 'tx', alt: 'bc1p p2tr taproot upgrade',
    d: 'A 2021 upgrade bringing Schnorr signatures and a scheme where complicated spending conditions look identical to simple ones on-chain when everyone cooperates. Its addresses begin bc1p.' },

  { t: 'Testnet', k: 'network', alt: 'test network signet regtest',
    d: 'A parallel network for testing, with coins that have no value and are handed out freely. Signet is the newer, better behaved version; regtest is a private one you run alone.' },

  { t: 'Transaction', k: 'tx', alt: 'tx transactions',
    d: 'A signed instruction that consumes existing outputs and creates new ones. Once mined it cannot be edited or cancelled, only followed by another transaction.',
    see: [['Decode a transaction', '/tools/decode']] },

  { t: 'Txid', k: 'tx', alt: 'transaction id hash transaction hash',
    d: 'The 64 character identifier of a transaction, which is a hash of its contents. It is how you look a payment up, and it exists as soon as the transaction is signed, before anyone has mined it.',
    see: [['Look up a transaction', '/']] },

  { t: 'Unconfirmed', k: 'tx', alt: 'pending unconfirmed transaction zero conf',
    d: 'Broadcast but not yet in a block. An unconfirmed transaction is a proposal: usually it confirms within the hour, and until it does it can be replaced or simply dropped by nodes if fees rise.',
    see: [['Confirmations explained', '/learn/confirmations']] },

  { t: 'UTXO', k: 'tx', alt: 'unspent transaction output utxos coin',
    d: 'An unspent transaction output: one chunk of bitcoin sitting at an address, spendable only in full. Your balance is the sum of your UTXOs, and their number and size drive what your next transaction costs.',
    see: [['What is a UTXO', '/learn/utxo']] },

  { t: 'Vanity address', k: 'keys', alt: 'custom address grinding',
    d: 'An address ground out by generating keys until one starts with a chosen string. The prefix is cosmetic. Generators that produce one for you can keep the key, and have.' },

  { t: 'Vbyte', k: 'tx', alt: 'virtual byte vsize weight unit',
    d: 'The unit transaction size is measured in for fees, equal to one quarter of a weight unit. It exists so SegWit data counts for less, which is the discount that makes SegWit transactions cheaper.',
    see: [['Fee calculator', '/fees/calculator']] },

  { t: 'Volatility', k: 'market', alt: 'volatile price swings',
    d: 'How much the price moves. Bitcoin\'s has fallen as the market has grown but remains far above that of currencies and most equities, and drawdowns of more than seventy percent have happened in every cycle so far.',
    see: [['Price history', '/price']] },

  { t: 'Wallet', k: 'keys', alt: 'wallets software wallet',
    d: 'Software or hardware that holds keys and builds transactions. It does not hold bitcoin: the coins are on the chain, and the wallet holds the authority to move them.',
    see: [['Wallet tools', '/wallets']] },

  { t: 'Watch-only wallet', k: 'privacy', alt: 'watch only monitoring xpub wallet',
    d: 'A wallet loaded with public keys only, so it shows balances and history but cannot spend. Useful for checking a cold storage balance without touching the keys.' },

  { t: 'Whale', k: 'market', alt: 'whales large holder',
    d: 'A holder large enough that their trades move the price. On a public ledger their addresses can often be watched, which spawns a genre of commentary that reads intent into ordinary custody reshuffles.',
    see: [['Rich list', '/rich-list']] },

  { t: 'Whitepaper', k: 'basics', alt: 'white paper satoshi paper 2008',
    d: 'The nine page paper Satoshi published in October 2008 describing the whole design. Still the clearest statement of what the system is for, and readable in an afternoon.',
    see: [['Read the whitepaper', '/learn/whitepaper']] },

  { t: 'Witness', k: 'tx', alt: 'witness data segwit signature data',
    d: 'The signature data SegWit moved out of the main transaction body. It still has to be valid; it is simply counted at a discount for fee purposes and excluded from the txid.' },

  { t: 'Zero-confirmation', k: 'risk', alt: '0-conf zeroconf unconfirmed payment',
    d: 'Treating an unconfirmed transaction as payment. Fine for a coffee, where the seller accepts a small and rare loss; unwise for anything large, since the transaction can still be replaced.',
    see: [['Double spending explained', '/learn/double-spend']] },

  { t: 'Zero-knowledge proof', k: 'privacy', alt: 'zk snark zkp',
    d: 'A proof that a statement is true which reveals nothing else. Central to some other chains and used in bitcoin research; not part of bitcoin\'s consensus rules today.' },

  { t: 'Bear market', k: 'market', alt: 'bear downtrend drawdown',
    d: 'A long stretch of falling prices and thin interest. Bitcoin has had several, each lasting roughly a year or more and taking the price down by seventy percent or worse from the previous high.',
    see: [['Price history', '/price']] },

  { t: 'Bitcoin Cash', k: 'network', alt: 'bch fork 2017 big blocks',
    d: 'A 2017 hard fork that raised the block size limit. Holders of bitcoin at the fork received an equal balance on the new chain. It is a separate network with its own price, hashrate and history since that day.' },

  { t: 'Block explorer', k: 'basics', alt: 'explorer chain explorer lookup',
    d: 'A website that lets you look up blocks, transactions and addresses without running a node. Convenient, and worth remembering that you are trusting its operator\'s answer unless you check against your own node.',
    see: [['Explorer', '/']] },

  { t: 'Block size', k: 'network', alt: 'block weight 1mb 4mb blocksize',
    d: 'The limit on how much can go in a block, expressed since SegWit as four million weight units, which works out around two megabytes in practice. Keeping it small is what keeps running a node cheap enough to be common.' },

  { t: 'Bridge', k: 'risk', alt: 'cross chain bridge wrapped',
    d: 'A service that locks coins on one chain and issues a representation on another. Bridges hold large pooled balances behind custody or contract code, and have been the single largest category of theft in crypto by value.' },

  { t: 'Bull market', k: 'market', alt: 'bull run uptrend',
    d: 'A sustained rise in price, usually with a rise in attention and in the number of new projects promising to be the next bitcoin. Historically these have peaked within eighteen months of a halving, which is a pattern rather than a rule.' },

  { t: 'Coin control', k: 'privacy', alt: 'utxo selection manual selection',
    d: 'Choosing which of your UTXOs a transaction spends instead of letting the wallet pick. It is how you avoid merging coins whose histories you would rather keep apart, and how you avoid spending dust at a bad fee rate.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'DAO', k: 'risk', alt: 'decentralized autonomous organisation governance token',
    d: 'An organisation whose decisions are made by token holder votes executed in code. In practice voting power tends to concentrate in whoever bought the most tokens, and the code has been drained more than once through flaws in the rules themselves.' },

  { t: 'DeFi', k: 'risk', alt: 'decentralized finance lending yield farming',
    d: 'Lending, trading and derivatives run by contracts on other chains rather than by firms. The contracts remove some counterparties and add a new one: the code, which has been exploited for billions of dollars in aggregate.' },

  { t: 'Escrow', k: 'tx', alt: 'third party escrow multisig escrow',
    d: 'Funds held until conditions are met. With bitcoin it can be done with a shared multisig where the escrow agent holds only one key, so they can arbitrate a dispute without being able to take the money.' },

  { t: 'Exchange', k: 'market', alt: 'cex trading platform',
    d: 'A venue for trading bitcoin against currencies or other assets. While your coins sit there they are the exchange\'s to lose, which is the lesson of every failure from Mt. Gox onward.',
    see: [['Frozen deposits explained', '/learn/frozen-deposits']] },

  { t: 'Gas', k: 'market', alt: 'gas fee ethereum fee',
    d: 'Ethereum\'s name for its transaction fee, priced per unit of computation. Bitcoin has no equivalent because its script language does not run open ended computation; bitcoin fees are priced by transaction size instead.' },

  { t: 'Inflation', k: 'market', alt: 'issuance rate monetary inflation',
    d: 'Growth in supply. Bitcoin\'s is fixed by the halving schedule and currently runs under one percent a year, falling toward zero. The word is also used for consumer price inflation, which is a different measurement entirely.' },

  { t: 'Initial block download', k: 'network', alt: 'ibd sync syncing',
    d: 'The first sync of a new node, where it downloads and verifies the entire chain from the beginning. It takes hours to days depending on hardware, and it only happens once.',
    see: [['Run a node', '/nodes']] },

  { t: 'Liquidity', k: 'market', alt: 'depth order book slippage',
    d: 'How much can be bought or sold without moving the price much. Thin liquidity is why a small market can be moved by one buyer, and why quoted prices on obscure venues mean little.' },

  { t: 'Maximalist', k: 'basics', alt: 'bitcoin maximalism maxi',
    d: 'Someone who holds that bitcoin is the only cryptocurrency worth using, generally on the grounds that the properties that matter, fixed supply and credible decentralisation, have not been reproduced elsewhere.' },

  { t: 'Mt. Gox', k: 'risk', alt: 'mtgox gox exchange collapse 2014',
    d: 'The exchange that handled most bitcoin trading until it collapsed in 2014, having lost hundreds of thousands of customer bitcoin over years. Creditors were still being repaid a decade later. The origin of the phrase not your keys, not your coins.',
    see: [['The timeline', '/history']] },

  { t: 'NFT', k: 'risk', alt: 'non fungible token collectible',
    d: 'A token recording ownership of a specific item, usually a pointer to an image hosted elsewhere. The 2021 market for them collapsed almost entirely; the bitcoin equivalent is the ordinals inscription.' },

  { t: 'Open source', k: 'basics', alt: 'foss source code auditable',
    d: 'Source code anyone can read, change and run. It matters for wallets in particular: closed source software asks you to take on faith that it generates keys properly and does not phone them home.' },

  { t: 'Oracle', k: 'tx', alt: 'price oracle data feed',
    d: 'A source that brings outside information onto a chain, such as a price. Whoever runs it becomes a trusted party, which is why contracts depending on one are only as sound as the oracle behind them.' },

  { t: 'Peg', k: 'market', alt: 'pegged depeg',
    d: 'A fixed exchange rate an asset is meant to hold, usually to a dollar. A peg is a promise by whoever backs it, and depegging is what happens when the market stops believing that promise.' },

  { t: 'Permissionless', k: 'basics', alt: 'no permission open access',
    d: 'You do not need approval to use it. Anyone can run a node, hold keys, send a transaction or mine, without registering, and without anyone having the technical ability to keep them out.' },

  { t: 'Pseudonymous', k: 'privacy', alt: 'anonymous privacy identity',
    d: 'Identified by an address rather than a name. It is not anonymity: the whole history of every address is public forever, so a single link between an address and a person exposes everything attached to it.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Replay attack', k: 'risk', alt: 'replay protection fork',
    d: 'After a chain split, rebroadcasting a transaction from one chain on the other, where it may also be valid. Forks that take it seriously add replay protection; those that do not have cost holders coins.' },

  { t: 'Sats per dollar', k: 'market', alt: 'satoshis per dollar sat/usd',
    d: 'How many satoshis one dollar buys. It rises as bitcoin falls and shrinks as it rises, which some people find a more intuitive way to watch the price than the other direction.',
    see: [['Sats per dollar', '/sats-per-dollar']] },

  { t: 'Shorting', k: 'market', alt: 'short selling leverage liquidation',
    d: 'Betting the price falls, usually with borrowed money. Losses are unbounded when the price rises instead, and leveraged positions on both sides get force closed in the sharp moves this market produces regularly.' },

  { t: 'Smart contract', k: 'tx', alt: 'contract programmable money',
    d: 'Conditions enforced by code rather than by a person. Bitcoin has them in a deliberately limited form: time locks, multisig, hashed conditions. Other chains run general programs, which buys flexibility and a much larger surface for bugs.' },

  { t: 'Stack', k: 'market', alt: 'stacking sats stacker',
    d: 'To accumulate bitcoin steadily, usually in small regular amounts. The phrase stacking sats describes the habit rather than any particular strategy.',
    see: [['DCA calculator', '/dca']] },

  { t: 'Sweep', k: 'keys', alt: 'sweeping private key import',
    d: 'Moving everything from a key you were given into a wallet you control. It is the right response to receiving a private key from anyone, since you cannot know how many copies of it exist.' },

  { t: 'Sybil attack', k: 'network', alt: 'sybil fake nodes eclipse',
    d: 'Flooding a network with fake identities to gain influence. Proof of work is bitcoin\'s answer: influence over which blocks get made comes from computation, which cannot be faked by spinning up more machines cheaply.' },

  { t: 'Timestamp', k: 'basics', alt: 'block time median time past',
    d: 'The time a miner claims a block was made. It is loosely constrained rather than exact, and can run ahead of or behind real time by up to a couple of hours, which is why height is the reliable ordering.' },

  { t: 'Tumbler', k: 'privacy', alt: 'mixer mixing service',
    d: 'A custodial service that takes coins and returns different ones. It breaks the on-chain link and hands your coins and your privacy to an operator, several of whom have turned out to be exit scams or law enforcement operations.',
    see: [['Privacy basics', '/learn/privacy']] },

  { t: 'Unit bias', k: 'market', alt: 'cheap coin price per coin',
    d: 'Preferring a coin because each one costs less, as though owning ten thousand of something is better than owning a fraction of something scarce. Supply differs by many orders of magnitude between assets, so price per unit says nothing on its own.' },

  { t: 'Wrapped bitcoin', k: 'risk', alt: 'wbtc tokenised bitcoin',
    d: 'A token on another chain that represents bitcoin held by a custodian. It moves inside that chain\'s ecosystem and depends entirely on the custodian continuing to hold and honour the underlying coins.' },

  { t: 'Yield', k: 'risk', alt: 'interest lending earn program',
    d: 'A return paid on deposited coins. Bitcoin itself pays nothing, so any yield comes from lending your coins to someone. Several of the largest programs offering it went bankrupt in 2022 with customer coins inside.',
    see: [['Frozen deposits explained', '/learn/frozen-deposits']] },
];

export const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
