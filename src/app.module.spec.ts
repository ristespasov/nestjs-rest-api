import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { UsersModule } from './users/users.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should include the UsersModule', () => {
    const usersModule = module.get<UsersModule>(UsersModule, { strict: false });
    expect(usersModule).toBeDefined();
  });

  it('should include the EmployeesModule', () => {
    const employeesModule = module.get<EmployeesModule>(EmployeesModule, {
      strict: false,
    });
    expect(employeesModule).toBeDefined();
  });

  it('should include the DatabaseModule', () => {
    const databaseModule = module.get<DatabaseModule>(DatabaseModule, {
      strict: false,
    });
    expect(databaseModule).toBeDefined();
  });

  it('should include the MyLoggerModule', () => {
    const myLoggerModule = module.get<MyLoggerModule>(MyLoggerModule, {
      strict: false,
    });
    expect(myLoggerModule).toBeDefined();
  });

  it('should provide the AppService', () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });

  it('should provide the AppController', () => {
    const appController = module.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });
});
