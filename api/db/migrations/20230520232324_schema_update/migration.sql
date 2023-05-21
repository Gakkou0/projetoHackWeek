/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `approved` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `cancelMotive` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `local` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `toDo` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `effort` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `advisorId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Project";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "datetime" DATETIME NOT NULL,
    "observations" TEXT,
    "deliverable" TEXT,
    "cancellationReason" TEXT,
    "location" TEXT NOT NULL,
    "studentAgreement" BOOLEAN NOT NULL DEFAULT false,
    "advisorAgreement" BOOLEAN NOT NULL DEFAULT false,
    "advisorId" INTEGER NOT NULL,
    "coadvisorId" INTEGER,
    "studentId" INTEGER NOT NULL,
    CONSTRAINT "Meeting_advisorId_fkey" FOREIGN KEY ("advisorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Meeting_coadvisorId_fkey" FOREIGN KEY ("coadvisorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Meeting_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meeting" ("id", "studentId") SELECT "id", "studentId" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
CREATE TABLE "new_Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "completionDeadline" DATETIME,
    "completionDate" DATETIME,
    "userId" INTEGER,
    "observation" TEXT,
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("description", "id") SELECT "description", "id" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userType" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "name", "userType") SELECT "id", "name", "userType" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
