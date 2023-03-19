-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MASTER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Ninja',
    "email" TEXT NOT NULL,
    "iconUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'title',
    "body" TEXT NOT NULL DEFAULT 'body',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWallets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'EpicsDAO',
    "chainType" TEXT NOT NULL DEFAULT 'Solana',
    "imgUrl" TEXT NOT NULL DEFAULT '',
    "pubkey" TEXT NOT NULL DEFAULT '',
    "privateKey" TEXT NOT NULL DEFAULT '',
    "priority" INTEGER NOT NULL DEFAULT 5,
    "sol" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "usdc" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "epct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "iv" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserWallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaTransfer" (
    "id" SERIAL NOT NULL,
    "amountLamport" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "signature" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SolanaTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");

-- CreateIndex
CREATE INDEX "Post_body_idx" ON "Post"("body");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_userId_key" ON "Post"("title", "userId");

-- CreateIndex
CREATE INDEX "UserWallets_pubkey_idx" ON "UserWallets"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallets_name_userId_key" ON "UserWallets"("name", "userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallets" ADD CONSTRAINT "UserWallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolanaTransfer" ADD CONSTRAINT "SolanaTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolanaTransfer" ADD CONSTRAINT "SolanaTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
