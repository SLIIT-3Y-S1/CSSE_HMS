import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

describe('DoctorController', () => {
  let doctorController: DoctorController;
  let doctorService: DoctorService;

  const mockDoctorService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return ['Doctor1', 'Doctor2'];
    }),
    findOneByUserID: jest.fn(id => {
      return { userID: id, name: 'Dr. Strange' };
    }),
    update: jest.fn((userID, dto) => {
        return { userID, ...dto }; // Ensure the returned object has userID
      }),
    remove: jest.fn(id => {
      return `Deleted doctor with ID ${id}`;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        {
          provide: DoctorService,
          useValue: mockDoctorService,
        },
      ],
    }).compile();

    doctorController = module.get<DoctorController>(DoctorController);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(doctorController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new doctor', async () => {
      const dto: CreateDoctorDto = {
          firstname: 'House', specialization: 'Gastrology',
          userID: '',
          lastname: '',
          contact: '',
          email: '',
          address: ''
      };
      expect(await doctorController.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(mockDoctorService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of doctors', async () => {
      expect(await doctorController.findAll()).toEqual(['Doctor1', 'Doctor2']);
      expect(mockDoctorService.findAll).toHaveBeenCalled();
    });
  });

  describe('getDoctorDetails', () => {
    it('should return a doctor by userID', async () => {
      const userID = '123';
      expect(await doctorController.getDoctorDetails(userID)).toEqual({
        userID: '123',
        name: 'Dr. Strange',
      });
      expect(mockDoctorService.findOneByUserID).toHaveBeenCalledWith(userID);
    });
  });

  describe('updateDoctor', () => {
    it('should update a doctor by userID', async () => {
      const userID = '123';
      const dto: UpdateDoctorDto = {
          firstname: 'House', 
          specialization: 'Neurology',
          lastname: '',
          contact: '',
          email: '',
          address: ''
      };
      expect(await doctorController.updateDoctor(userID, dto)).toEqual({
        userID,
        ...dto,
      });
      expect(mockDoctorService.update).toHaveBeenCalledWith(userID, dto);
    });
  });

});




