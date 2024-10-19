-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- CreateTable
CREATE TABLE `Allergies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientID` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Immunizations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientID` CHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Allergies` ADD CONSTRAINT `Allergies_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Immunizations` ADD CONSTRAINT `Immunizations_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;
