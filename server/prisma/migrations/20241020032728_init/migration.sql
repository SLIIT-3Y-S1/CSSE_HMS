-- CreateTable
CREATE TABLE `User` (
    `userID` CHAR(36) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('patient', 'doctor', 'admin') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `patientID` CHAR(36) NOT NULL,
    `userID` CHAR(36) NOT NULL,
    `uniqueCode` VARCHAR(20) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `NIC` VARCHAR(20) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
    `contact` VARCHAR(15) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Patient_userID_key`(`userID`),
    PRIMARY KEY (`patientID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `doctorID` CHAR(36) NOT NULL,
    `userID` CHAR(36) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `specialization` VARCHAR(100) NOT NULL,
    `contact` VARCHAR(15) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Doctor_userID_key`(`userID`),
    PRIMARY KEY (`doctorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientHealthCard` (
    `patientID` CHAR(36) NOT NULL,
    `healthcardID` CHAR(36) NOT NULL,
    `healthCardStatus` ENUM('pending', 'approved') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PatientHealthCard_patientID_key`(`patientID`),
    PRIMARY KEY (`healthcardID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientExtra` (
    `patientID` CHAR(36) NOT NULL,
    `allergies` VARCHAR(191) NULL,
    `immunizations` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`patientID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientPrescription` (
    `prescriptionID` CHAR(36) NOT NULL,
    `patientID` CHAR(36) NOT NULL,
    `doctorID` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prescriptionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientPrescriptionDrug` (
    `prescriptionID` CHAR(36) NOT NULL,
    `medicationID` CHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prescriptionID`, `medicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrugInventory` (
    `medicationID` CHAR(36) NOT NULL,
    `drugName` VARCHAR(100) NOT NULL,
    `details` VARCHAR(191) NULL,
    `stockLevel` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`medicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientMedicalRecord` (
    `recordID` CHAR(36) NOT NULL,
    `patientID` CHAR(36) NOT NULL,
    `doctorID` CHAR(36) NOT NULL,
    `diagnosis` VARCHAR(191) NULL,
    `treatmentPlan` VARCHAR(191) NULL,
    `prescriptionID` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`recordID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `appointmentID` CHAR(36) NOT NULL,
    `patientID` CHAR(36) NOT NULL,
    `doctorID` CHAR(36) NOT NULL,
    `appointmentDate` DATETIME(3) NOT NULL,
    `appointmentTime` DATETIME(3) NOT NULL,
    `status` ENUM('scheduled', 'completed', 'cancelled') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`appointmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Billing` (
    `billingID` CHAR(36) NOT NULL,
    `patientID` CHAR(36) NOT NULL,
    `appointmentID` CHAR(36) NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `paymentStatus` ENUM('pending', 'paid', 'failed') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Billing_appointmentID_key`(`appointmentID`),
    PRIMARY KEY (`billingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `paymentID` CHAR(36) NOT NULL,
    `billingID` CHAR(36) NOT NULL,
    `paymentMethod` ENUM('credit_card', 'debit_card', 'cash', 'insurance', 'online') NOT NULL,
    `paymentAmount` DOUBLE NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transactionId` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientHealthCard` ADD CONSTRAINT `PatientHealthCard_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientExtra` ADD CONSTRAINT `PatientExtra_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPrescription` ADD CONSTRAINT `PatientPrescription_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPrescription` ADD CONSTRAINT `PatientPrescription_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `Doctor`(`doctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPrescriptionDrug` ADD CONSTRAINT `PatientPrescriptionDrug_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `PatientPrescription`(`prescriptionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientPrescriptionDrug` ADD CONSTRAINT `PatientPrescriptionDrug_medicationID_fkey` FOREIGN KEY (`medicationID`) REFERENCES `DrugInventory`(`medicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientMedicalRecord` ADD CONSTRAINT `PatientMedicalRecord_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientMedicalRecord` ADD CONSTRAINT `PatientMedicalRecord_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `Doctor`(`doctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientMedicalRecord` ADD CONSTRAINT `PatientMedicalRecord_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `PatientPrescription`(`prescriptionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorID_fkey` FOREIGN KEY (`doctorID`) REFERENCES `Doctor`(`doctorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billing` ADD CONSTRAINT `Billing_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `Patient`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Billing` ADD CONSTRAINT `Billing_appointmentID_fkey` FOREIGN KEY (`appointmentID`) REFERENCES `Appointment`(`appointmentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_billingID_fkey` FOREIGN KEY (`billingID`) REFERENCES `Billing`(`billingID`) ON DELETE RESTRICT ON UPDATE CASCADE;
