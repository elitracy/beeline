/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userId` on the `Password` table. All the data in the column will be lost.
  - Added the required column `passengerId` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Passenger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Airplane" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "departure_time" DATETIME NOT NULL,
    "arrival_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seat_number" INTEGER NOT NULL,
    "seat_row" INTEGER NOT NULL,
    "seat_class" TEXT NOT NULL,
    "airplaneId" TEXT NOT NULL,
    CONSTRAINT "Seat_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PassengerToSeat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PassengerToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Passenger" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PassengerToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seat" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AirportToPassenger" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AirportToPassenger_A_fkey" FOREIGN KEY ("A") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AirportToPassenger_B_fkey" FOREIGN KEY ("B") REFERENCES "Passenger" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AirplaneToAirport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AirplaneToAirport_A_fkey" FOREIGN KEY ("A") REFERENCES "Airplane" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AirplaneToAirport_B_fkey" FOREIGN KEY ("B") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AirplaneToPassenger" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AirplaneToPassenger_A_fkey" FOREIGN KEY ("A") REFERENCES "Airplane" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AirplaneToPassenger_B_fkey" FOREIGN KEY ("B") REFERENCES "Passenger" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "hash" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    CONSTRAINT "Password_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Password" ("hash") SELECT "hash" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
CREATE UNIQUE INDEX "Password_passengerId_key" ON "Password"("passengerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Passenger_email_key" ON "Passenger"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_name_key" ON "Airport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PassengerToSeat_AB_unique" ON "_PassengerToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_PassengerToSeat_B_index" ON "_PassengerToSeat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AirportToPassenger_AB_unique" ON "_AirportToPassenger"("A", "B");

-- CreateIndex
CREATE INDEX "_AirportToPassenger_B_index" ON "_AirportToPassenger"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AirplaneToAirport_AB_unique" ON "_AirplaneToAirport"("A", "B");

-- CreateIndex
CREATE INDEX "_AirplaneToAirport_B_index" ON "_AirplaneToAirport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AirplaneToPassenger_AB_unique" ON "_AirplaneToPassenger"("A", "B");

-- CreateIndex
CREATE INDEX "_AirplaneToPassenger_B_index" ON "_AirplaneToPassenger"("B");
