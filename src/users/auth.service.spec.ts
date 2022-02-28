import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    // *** Temp DI Container
    // 1) create a fake copy users service
    usersServiceMock = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    // 2) Temp Di Container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    // *** reach into container and get a new instance of the AuthService with initialized deps
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdfgh@asdfgh-com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if email is in use', async () => {
    expect.assertions(1);
    usersServiceMock.find = () =>
      Promise.resolve([{ id: 1, email: 'a@a.a', password: 'q' } as User]);
    await expect(
      service.signup('user@mail.com', 'qwerty'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws if signin is called with an unused email', async () => {
    expect.assertions(1);
    await expect(
      service.signin('adfasdf@fadsf.com', 'pass3434'),
    ).rejects.toThrowError(NotFoundException);
  });
});
