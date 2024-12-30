import { Test, TestingModule } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

describe('EmployeesController', () => {
  let employeesController: EmployeesController;
  let employeesService: EmployeesService;

  const mockEmployeesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const createMockEmployee = (overrides = {}) => ({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: $Enums.Role.INTERN,
    createdAt: new Date('2024-12-29T18:37:54.533Z'),
    updatedAt: new Date('2024-12-29T18:37:54.533Z'),
    ...overrides,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    employeesController = module.get<EmployeesController>(EmployeesController);
    employeesService = module.get<EmployeesService>(EmployeesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const createEmployeeDto = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        role: $Enums.Role.INTERN,
      };

      const result = createMockEmployee(createEmployeeDto);

      jest.spyOn(employeesService, 'create').mockResolvedValue(result);

      const response = await employeesController.create(createEmployeeDto);
      expect(response).toEqual(result);
      expect(employeesService.create).toHaveBeenCalledWith(createEmployeeDto);
    });
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      const result = [
        createMockEmployee(),
        createMockEmployee({
          id: 2,
          name: 'Jane Doe',
          role: $Enums.Role.ADMIN,
        }),
      ];

      jest.spyOn(employeesService, 'findAll').mockResolvedValue(result);

      const response = await employeesController.findAll('127.0.0.1');
      expect(response).toEqual(result);
      expect(employeesService.findAll).toHaveBeenCalledWith(undefined);
    });

    it('should return all employees with a specific role', async () => {
      const role = 'INTERN';
      const result = [createMockEmployee()];

      jest.spyOn(employeesService, 'findAll').mockResolvedValue(result);

      const response = await employeesController.findAll('127.0.0.1', role);
      expect(response).toEqual(result);
      expect(employeesService.findAll).toHaveBeenCalledWith(role);
    });
  });

  describe('findOne', () => {
    it('should return a single employee by ID', async () => {
      const result = createMockEmployee();

      jest.spyOn(employeesService, 'findOne').mockResolvedValue(result);

      const response = await employeesController.findOne('1');
      expect(response).toEqual(result);
      expect(employeesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an employee by ID', async () => {
      const updateEmployeeDto = { name: 'John Updated' };
      const result = createMockEmployee({ name: 'John Updated' });

      jest.spyOn(employeesService, 'update').mockResolvedValue(result);

      const response = await employeesController.update('1', updateEmployeeDto);
      expect(response).toEqual(result);
      expect(employeesService.update).toHaveBeenCalledWith(
        1,
        updateEmployeeDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete an employee by ID', async () => {
      const result = createMockEmployee();

      jest.spyOn(employeesService, 'remove').mockResolvedValue(result);

      const response = await employeesController.remove('1');
      expect(response).toEqual(result);
      expect(employeesService.remove).toHaveBeenCalledWith(1);
    });
  });
});
