/*
  Warnings:

  - You are about to drop the column `appointmentDate` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `appointmentTime` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `consultChartID` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `appointmentDate`,
    DROP COLUMN `appointmentTime`,
    ADD COLUMN `consultChartID` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_consultChartID_fkey` FOREIGN KEY (`consultChartID`) REFERENCES `ConsultChart`(`consultChartID`) ON DELETE RESTRICT ON UPDATE CASCADE;
