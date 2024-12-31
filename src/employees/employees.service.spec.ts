import { Test, TestingModule } from '@nestjs/testing';
import { $Enums } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let employeesService: EmployeesService;
  let databaseService: jest.Mocked<DatabaseService>;

  const mockDatabaseService = {
    employee: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
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
      providers: [
        EmployeesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    employeesService = module.get<EmployeesService>(EmployeesService);
    databaseService = module.get(
      DatabaseService,
    ) as jest.Mocked<DatabaseService>;
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

      (databaseService.employee.create as jest.Mock).mockResolvedValue(result);

      const response = await employeesService.create(createEmployeeDto);
      expect(response).toEqual(result);
      expect(databaseService.employee.create).toHaveBeenCalledWith({
        data: createEmployeeDto,
      });
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

      (databaseService.employee.findMany as jest.Mock).mockResolvedValue(
        result,
      );

      const response = await employeesService.findAll();
      expect(response).toEqual(result);
      expect(databaseService.employee.findMany).toHaveBeenCalled();
    });

    it('should return employees filtered by role', async () => {
      const role = $Enums.Role.INTERN;
      const result = [createMockEmployee()];

      (databaseService.employee.findMany as jest.Mock).mockResolvedValue(
        result,
      );

      const response = await employeesService.findAll(role);
      expect(response).toEqual(result);
      expect(databaseService.employee.findMany).toHaveBeenCalledWith({
        where: { role },
      });
    });
  });

  describe('findOne', () => {
    it('should return an employee by ID', async () => {
      const result = createMockEmployee();

      (databaseService.employee.findUnique as jest.Mock).mockResolvedValue(
        result,
      );

      const response = await employeesService.findOne(1);
      expect(response).toEqual(result);
      expect(databaseService.employee.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update an employee by ID', async () => {
      const updateEmployeeDto = { name: 'Updated Name' };
      const result = createMockEmployee({ name: 'John Updated' });

      (databaseService.employee.update as jest.Mock).mockResolvedValue(result);

      const response = await employeesService.update(1, updateEmployeeDto);
      expect(response).toEqual(result);
      expect(databaseService.employee.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateEmployeeDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete an employee by ID', async () => {
      const result = createMockEmployee();

      (databaseService.employee.delete as jest.Mock).mockResolvedValue(result);

      const response = await employeesService.remove(1);
      expect(response).toEqual(result);
      expect(databaseService.employee.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
