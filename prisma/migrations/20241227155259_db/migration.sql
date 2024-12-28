/*
  Warnings:

  - The primary key for the `Chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `chatName` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatName` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "chatName" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Chat_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("createdAt", "updatedAt") SELECT "createdAt", "updatedAt" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
CREATE UNIQUE INDEX "Chat_chatName_key" ON "Chat"("chatName");
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "chatName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_chatName_fkey" FOREIGN KEY ("chatName") REFERENCES "Chat" ("chatName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("author", "content", "createdAt", "id") SELECT "author", "content", "createdAt", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_User" (
    "userName" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "updatedAt", "userName") SELECT "createdAt", "updatedAt", "userName" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
