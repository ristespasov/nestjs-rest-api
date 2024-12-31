import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesModule } from './employees.module';
import { EmployeesService } from './employees.service';

describe('EmployeesModule', () => {
  let module: TestingModule;

  const mockDatabaseModule = {
    module: class MockDatabaseModule {},
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EmployeesModule, mockDatabaseModule.module],
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should provide the EmployeesService', () => {
    const service = module.get<EmployeesService>(EmployeesService);
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(EmployeesService);
  });

  it('should provide the EmployeesController', () => {
    const controller = module.get<EmployeesController>(EmployeesController);
    expect(controller).toBeDefined();
    expect(controller).toBeInstanceOf(EmployeesController);
  });
});
