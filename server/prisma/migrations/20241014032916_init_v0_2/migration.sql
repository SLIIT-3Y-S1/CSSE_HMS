/*
  Warnings:

  - Added the required column `appointmentType` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `appointmentType` VARCHAR(100) NOT NULL;
