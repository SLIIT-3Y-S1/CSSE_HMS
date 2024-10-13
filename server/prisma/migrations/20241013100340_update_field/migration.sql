-- DropForeignKey
ALTER TABLE `patientmedicalrecord` DROP FOREIGN KEY `PatientMedicalRecord_prescriptionID_fkey`;

-- AlterTable
ALTER TABLE `patientmedicalrecord` MODIFY `prescriptionID` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `PatientMedicalRecord` ADD CONSTRAINT `PatientMedicalRecord_prescriptionID_fkey` FOREIGN KEY (`prescriptionID`) REFERENCES `PatientPrescription`(`prescriptionID`) ON DELETE SET NULL ON UPDATE CASCADE;
