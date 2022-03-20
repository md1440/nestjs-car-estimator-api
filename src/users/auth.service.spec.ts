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
    // 1) create a mock usersService
    const users: User[] = [];

    usersServiceMock = {
      find: (email: string) => {
        const filteredUsers = users.filter(
          (user: User) => user.email === email,
        );
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // usersServiceMock = {
    //   find: () => Promise.resolve([]),
    //   create: (email: string, password: string) =>
    //     Promise.resolve({ id: 1, email, password } as User),
    // };

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
    const user = await service.signup('asdfgh@asdfgh.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if email is in use', async () => {
    expect.assertions(1);
    // *** block scoped modification of find method to return a User
    // usersServiceMock.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a@a.a', password: 'q' } as User]);
    await service.signup('user@mail.com', 'qwerty'),
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

  it('throws if an invalid password is provided', async () => {
    expect.assertions(1);
    // usersServiceMock.find = () =>
    //   Promise.resolve([{ email: 'asfd@asdf.com', password: 'asfasd' } as User]);
    await service.signup('asfd@asdf.com', '45243553'),
      await expect(
        service.signin('asfd@asdf.com', 'password'),
      ).rejects.toThrowError(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asfd@asdf.com', 'asfasd');
    const user = await service.signin('asfd@asdf.com', 'asfasd');
    expect(user).toBeDefined();

    // *** before usersServiceMock Refactoring
    // expect.assertions(1);
    // usersServiceMock.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'asfd@asdf.com',
    //       password:
    //         'c76ed1bba06cbd19.b8143735decd14525fcb4179c0dd38746b4346b9173576d5a42fabb9d1323678',
    //     } as User,
    //   ]);

    // *** retrieve salted and hashed pw
    // console.log(user);
    // const user = await service.signup('asfd@asdf.com', 'asfasd');
    // console.log(user);
    // const user = await service.signin('asfd@asdf.com', 'asfasd');
    // expect(user).toBeDefined();
  });
});
