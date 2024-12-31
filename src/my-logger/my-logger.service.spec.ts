import { Test, TestingModule } from '@nestjs/testing';
import { MyLoggerService } from './my-logger.service';

jest.mock('fs');
jest.mock('fs/promises', () => ({
  mkdir: jest.fn(),
  appendFile: jest.fn(),
}));

describe('MyLoggerService', () => {
  let service: MyLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyLoggerService],
    }).compile();

    service = module.get<MyLoggerService>(MyLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should log message to file', async () => {
    const logSpy = jest
      .spyOn(service, 'logToFile')
      .mockImplementation(async () => {});
    const message = 'Test log message';
    service.log(message);
    expect(logSpy).toHaveBeenCalledWith(`undefined\t${message}`);
  });

  it('should log error to file', async () => {
    const logSpy = jest
      .spyOn(service, 'logToFile')
      .mockImplementation(async () => {});
    const message = 'Test error message';
    const context = 'TestContext';
    service.error(message, context);
    expect(logSpy).toHaveBeenCalledWith(`${context}\t${message}`);
  });

  // TODO
  // it('should create logs directory if it does not exist', async () => {
  //   (fs.existsSync as jest.Mock).mockReturnValue(false);
  //   const mkdirSpy = jest
  //     .spyOn(fs.promises, 'mkdir')
  //     .mockImplementation(async () => 'mockedPath');
  //   await service.logToFile('Test log entry');
  //   expect(mkdirSpy).toHaveBeenCalledWith(
  //     path.join(__dirname, '..', '..', 'logs'),
  //   );
  // });

  // it('should append log entry to file', async () => {
  //   (fs.existsSync as jest.Mock).mockReturnValue(true);
  //   const appendFileSpy = jest
  //     .spyOn(fs.promises, 'appendFile')
  //     .mockImplementation(async () => {});
  //   await service.logToFile('Test log entry');
  //   expect(appendFileSpy).toHaveBeenCalledWith(
  //     path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
  //     expect.any(String),
  //   );
  // });
});
