/*
  Warnings:

  - You are about to drop the column `userId` on the `Goal` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "completionDeadline" DATETIME,
    "completionDate" DATETIME,
    "observation" TEXT,
    "projectId" INTEGER,
    CONSTRAINT "Goal_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("completionDate", "completionDeadline", "description", "id", "observation") SELECT "completionDate", "completionDeadline", "description", "id", "observation" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
