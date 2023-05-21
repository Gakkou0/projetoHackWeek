-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Meeting" (
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

-- CreateTable
CREATE TABLE "Goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "completionDeadline" DATETIME,
    "completionDate" DATETIME,
    "userId" INTEGER,
    "observation" TEXT,
    CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
