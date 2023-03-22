import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js'
import bs58 from 'bs58'
import { PrismaClient, UserWallets } from '@prisma/client'
import { decrypt } from './crypto'

const prisma = new PrismaClient()

export const LAMPORTS_PER_EPCT = 1_000_000

export const LABO_TOKENS = [
  {
    symbol: 'EPCT',
    mintAddress: 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP',
  },
  {
    symbol: 'USDC',
    mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  },
  {
    symbol: 'SOL',
    mintAddress: 'So11111111111111111111111111111111111111112',
  },
]
export type WalletData = Array<TokenBalance>

export type TokenBalance = {
  tokenMintAddress: string
  amountLamport: number
}

export const connection = new Connection('https://api.devnet.solana.com')

export const genKeypair = async () => {
  const keypair = Keypair.generate()
  return keypair
}

export const getTokenType = async (tokenAddress: string) => {
  const token = LABO_TOKENS.filter(
    (value) => value.mintAddress === tokenAddress
  )
  return token[0].symbol
}

export const usdcOrEpct = async (tokenAddress: string) => {
  const symbol = await getTokenType(tokenAddress)
  if (symbol === 'EPCT') {
    return { tokenMintAddress: LABO_TOKENS[1].mintAddress, amountLamport: 0 }
  } else if (symbol === 'USDC') {
    return { tokenMintAddress: LABO_TOKENS[0].mintAddress, amountLamport: 0 }
  }
}

export const getTokenMintAddress = async (symbol: string) => {
  const token = LABO_TOKENS.filter((value) => value.symbol === symbol)
  return token[0].mintAddress
}

export const getKeypairData = async (keypair: Keypair) => {
  return {
    pubkey: keypair.publicKey.toBase58(),
    secretKey: bs58.encode(keypair.secretKey),
    unit8Array: keypair.secretKey,
  }
}

export const getKeypairFromArrayString = async (keyString: string) => {
  const secretKeyArray = keyString.split(',').map((i) => Number(i))
  const secretKey = Uint8Array.from(secretKeyArray)
  const keypair = Keypair.fromSecretKey(secretKey)
  return keypair
}

export const getAirdrop = async (connection: Connection, keypair: Keypair) => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      LAMPORTS_PER_SOL
    )
    const latestBlockHash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    })
    return airdropSignature
  } catch (error) {
    console.error(error)
  }
}

export const getBalance = async (connection: Connection, keypair: Keypair) => {
  try {
    return await connection.getBalance(keypair.publicKey)
  } catch (error) {
    throw new Error(`getBalance: ${error}`)
  }
}

export const showSplTokenBalance = async (
  connection: Connection,
  pubkeyString: string
) => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey(pubkeyString),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  )

  console.log('Token                                         Balance')
  console.log('------------------------------------------------------------')
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data)
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`)
  })
}

export const getSplTokenBalance = async (
  connection: Connection,
  pubkeyString: string
) => {
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      new PublicKey(pubkeyString),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    )

    let walletData: WalletData = []
    for await (const tokenAccount of tokenAccounts.value) {
      const accountData = AccountLayout.decode(tokenAccount.account.data)
      walletData.push({
        tokenMintAddress: String(accountData.mint),
        amountLamport: Number(accountData.amount),
      })
    }
    if (walletData.length === 0) {
      walletData = [
        {
          tokenMintAddress: LABO_TOKENS[0].mintAddress,
          amountLamport: 0,
        },
        {
          tokenMintAddress: LABO_TOKENS[1].mintAddress,
          amountLamport: 0,
        },
      ]
    } else if (walletData.length == 1) {
      const body = await usdcOrEpct(walletData[0].tokenMintAddress)
      if (body) walletData.push(body)
    }
    return walletData
  } catch (error) {
    console.log(`getSplTokenBalance: ${error}`)
  }
}

export const getTokenBalances = async (
  connection: Connection,
  userWallet: UserWallets
) => {
  try {
    const decoded = await decrypt(userWallet.privateKey, userWallet.iv)
    const keypair = await getKeypairFromArrayString(decoded)
    const keypairInfo = await getKeypairData(keypair)
    console.log(keypairInfo.pubkey)
    const splBalance = await getSplTokenBalance(connection, keypairInfo.pubkey)
    const tokenBalance: { [key: string]: number } = {}
    const solBalance = await getBalance(connection, keypair)
    if (splBalance)
      for await (const tokenInfo of splBalance) {
        const tokenSymbol = await getTokenType(tokenInfo.tokenMintAddress)
        const symbol = tokenSymbol.toLowerCase() || ''
        tokenBalance[symbol] = tokenInfo.amountLamport / LAMPORTS_PER_EPCT
      }
    tokenBalance['sol'] = solBalance / LAMPORTS_PER_SOL
    return tokenBalance
  } catch (error) {
    throw new Error(`getTokenBalances: ${error}`)
  }
}

export const createSolanaTransfer = async (
  amountLamport: number,
  fromUserId: number,
  toUserId: number,
  signature?: string
) => {
  const solanaTransfer = await prisma.solanaTransfer.create({
    data: {
      amountLamport,
      fromUser: {
        connect: { id: fromUserId },
      },
      toUser: {
        connect: { id: toUserId },
      },
      signature,
    },
  })
  return solanaTransfer
}
