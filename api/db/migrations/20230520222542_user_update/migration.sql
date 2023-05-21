/*
  Warnings:

  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supervisor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MeetingToSupervisor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- DropIndex
DROP INDEX "Supervisor_email_key";

-- DropIndex
DROP INDEX "_MeetingToSupervisor_B_index";

-- DropIndex
DROP INDEX "_MeetingToSupervisor_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Student";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Supervisor";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MeetingToSupervisor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" DATETIME NOT NULL,
    "studentId" INTEGER NOT NULL,
    "local" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "toDo" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "cancelMotive" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Meeting_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meeting" ("approved", "cancelMotive", "dateTime", "id", "local", "notes", "status", "studentId", "toDo") SELECT "approved", "cancelMotive", "dateTime", "id", "local", "notes", "status", "studentId", "toDo" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
