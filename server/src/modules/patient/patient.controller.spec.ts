import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { CreateAllergyDto } from './dto/create-patient-allergy.dto';
import { UpdatePatientAllergyDto } from './dto/update-patient-allergy.dto';

describe('PatientController - Allergy', () => {
  let patientController: PatientController;
  let patientService: PatientService;

  const mockPatientService = {
    createAllergy: jest.fn(dto => {
      return { id: Date.now(), ...dto };
    }),
    getAllergiesByPatientID: jest.fn(patientID => {
      return [{ id: 1, patientID, name: 'Peanuts' }];
    }),
    deleteAllergy: jest.fn(id => {
      return `Deleted allergy with ID ${id}`;
    }),
    updateAllergy: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    }).compile();

    patientController = module.get<PatientController>(PatientController);
    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(patientController).toBeDefined();
  });

  // Positive Test for createAllergy
  describe('createAllergy', () => {
    it('should create a new allergy record for a patient', async () => {
      const createAllergyDto: CreateAllergyDto = {
        patientID: '123',
        name: 'Pollen',
      };

      const result = await patientController.createAllergy(createAllergyDto);
      
      expect(result).toEqual({
        id: expect.any(Number),
        ...createAllergyDto,
      });
      expect(mockPatientService.createAllergy).toHaveBeenCalledWith(createAllergyDto);
    });
  });

  // Positive Test for getAllergiesByPatientID
  describe('getAllergiesByPatientID', () => {
    it('should return a list of allergies for a patient', async () => {
      const patientID = '123';

      const result = await patientController.getAllergiesByPatientID(patientID);
      
      expect(result).toEqual([{ id: 1, patientID, name: 'Peanuts' }]);
      expect(mockPatientService.getAllergiesByPatientID).toHaveBeenCalledWith(patientID);
    });
  });

  // Positive Test for deleteAllergy
  describe('deleteAllergy', () => {
    it('should delete an allergy by ID', async () => {
      const allergyID = '1'; // Pass as a string
  
      const result = await patientController.deleteAllergy(allergyID);
      
      expect(result).toEqual(`Deleted allergy with ID ${allergyID}`);
      expect(mockPatientService.deleteAllergy).toHaveBeenCalledWith(Number(allergyID));
    });
  });
  

  // Positive Test for updateAllergy
  describe('updateAllergy', () => {
    it('should update an allergy record by ID', async () => {
      const allergyID = 1;
      const updateAllergyDto: UpdatePatientAllergyDto = {
        name: 'Pollen',
      };

      const result = await patientController.updateAllergy(allergyID, updateAllergyDto);
      
      expect(result).toEqual({ id: allergyID, ...updateAllergyDto });
      expect(mockPatientService.updateAllergy).toHaveBeenCalledWith(allergyID, updateAllergyDto);
    });
  });

});
