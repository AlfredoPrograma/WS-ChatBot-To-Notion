import { CreateUserDto } from '@/core/models/user';
import { UsersService } from '@/users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { AuthService } from '../auth.service';
import { EncryptService } from '../encrypt.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = createMock<UsersService>();
  const mockEncryptService = createMock<EncryptService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: EncryptService,
          useValue: mockEncryptService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user', async () => {
    // Arrange
    const createUserPayload: CreateUserDto = {
      email: 'test@mail.com',
      password: '123456',
    };

    mockEncryptService.encryptPassword.mockResolvedValue('encryptedPassword');

    mockUsersService.create.mockResolvedValue({
      id: randomUUID(),
      email: createUserPayload.email,
      password: 'encryptedPassword',
    });

    // Act
    const registeredUser = await service.signUp(createUserPayload);

    // Assert
    expect(registeredUser).not.toBeNull();
    expect(registeredUser.id).toBeDefined();
    expect(registeredUser.password).not.toEqual(createUserPayload.password);
  });
});
