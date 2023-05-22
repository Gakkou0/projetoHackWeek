/*
  Warnings:

  - Added the required column `title` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meeting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
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
INSERT INTO "new_Meeting" ("advisorAgreement", "advisorId", "cancellationReason", "coadvisorId", "datetime", "deliverable", "id", "location", "observations", "studentAgreement", "studentId") SELECT "advisorAgreement", "advisorId", "cancellationReason", "coadvisorId", "datetime", "deliverable", "id", "location", "observations", "studentAgreement", "studentId" FROM "Meeting";
DROP TABLE "Meeting";
ALTER TABLE "new_Meeting" RENAME TO "Meeting";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
