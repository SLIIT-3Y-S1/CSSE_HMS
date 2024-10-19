-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `refund` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reschedule` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Hospital` (
    `hospitalID` CHAR(36) NOT NULL,
    `hospitalName` VARCHAR(100) NOT NULL,
    `hospitalFee` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`hospitalID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultChart` (
    `consultChartID` CHAR(36) NOT NULL,
    `doctorID` CHAR(36) NOT NULL,
    `hospitalID` CHAR(36) NOT NULL,
    `consultDate` DATETIME(3) NOT NULL,
    `consultTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`consultChartID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsultChart` ADD CONSTRAINT `ConsultChart_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `Doctor`(`doctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsultChart` ADD CONSTRAINT `ConsultChart_hospitalID_fkey` FOREIGN KEY (`hospitalID`) REFERENCES `Hospital`(`hospitalID`) ON DELETE RESTRICT ON UPDATE CASCADE;
