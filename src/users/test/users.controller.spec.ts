import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from '../../urls/urls.service';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import {
  createUserStub,
  deleteUserStub,
  getAllUsersStub,
  getSingleUserStub,
  updateUserStub,
} from './stubs/user.stub';

// jest.mock('../users.service');
// jest.mock('../../urls/urls.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let urlsService: UrlsService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            insertUser: jest
              .fn()
              .mockImplementation((name: string, email: string) =>
                Promise.resolve({
                  status: 201,
                  message: 'User has been created sucessfully',
                  data: {
                    name,
                    email,
                    createdAt: '2023-04-20T19:48:46.360Z',
                    _id: '6441971ecbc71a71948b3043',
                    __v: 0,
                  },
                }),
              ),
            updateUser: jest
              .fn()
              .mockImplementation(
                (userId: string, name: string, email: string) =>
                  Promise.resolve({
                    status: 200,
                    message: 'User has been updated sucessfully',
                    data: {
                      name,
                      email,
                      createdAt: '2023-04-20T19:48:46.360Z',
                      _id: userId,
                      __v: 0,
                    },
                  }),
              ),
            getUsers: jest.fn().mockImplementation(() =>
              Promise.resolve({
                status: 200,
                message: 'Users details retrieved successfully',
                data: [
                  {
                    id: '643fce59c2e72bb36bbc5da8',
                    name: 'asish5',
                    email: 'asish5@gmail.com',
                    createdAt: '2023-04-19T11:19:53.915Z',
                  },
                  {
                    id: '6441971ecbc71a71948b3043',
                    name: 'Asihs',
                    email: 'admsdk@rm.com',
                    createdAt: '2023-04-20T19:48:46.360Z',
                  },
                ],
              }),
            ),
            getSingleUser: jest.fn().mockImplementation((userId: string) =>
              Promise.resolve({
                status: 200,
                message: 'Users details retrieved successfully',
                data: {
                  id: userId,
                  name: 'asish5',
                  email: 'asish5@gmail.com',
                  createdAt: '2023-04-19T11:19:53.915Z',
                },
              }),
            ),

            deleteUser: jest.fn().mockImplementation((userId: string) =>
              Promise.resolve({
                status: 200,
                message: 'User details of' + userId + 'deleted successfully',
              }),
            ),
          },
        },
        {
          provide: UrlsService,
          useValue: {},
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    urlsService = moduleRef.get<UrlsService>(UrlsService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user;
      const userId = getSingleUserStub()?.data?.id;
      beforeEach(async () => {
        user = await usersController.getUser(userId);
      });

      test('then it should call usersService', () => {
        expect(usersService.getSingleUser).toBeCalledWith(userId);
      });

      test('then is should return a user', () => {
       // const resultData = user?.data || {};
        console.log(user);
        expect(user).toEqual(getSingleUserStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users;

      beforeEach(async () => {
        users = await usersController.getAllUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.getUsers).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        const resultData = users?.data || {};
        expect(resultData).toEqual(getAllUsersStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      const name = createUserStub()?.data?.name;
      const email = createUserStub()?.data?.email;
      let user;
      beforeEach(async () => {
        user = await usersController.addUser(name, email);
      });

      test('then it should call usersService', () => {
        expect(usersService.insertUser).toHaveBeenCalledWith(name, email);
      });

      test('then it should return a user', () => {
        const resultData = user?.data || {};
        expect(resultData).toEqual(createUserStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      const userId = updateUserStub()?.data?._id;
      const name = updateUserStub()?.data?.name;
      const email = updateUserStub()?.data?.email;
      let user;

      beforeEach(async () => {
        user = await usersController.updateUser(userId, name, email);
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userId,
          name,
          email,
        );
      });

      test('then it should return a user', () => {
        const resultData = user?.data || {};
        expect(resultData).toEqual(updateUserStub());
      });
    });
  });

//   describe('deleteUser', () => {
//     describe('when updateUser is called', () => {
//       let user;
//       const userId = updateUserStub()?.data?._id;

//       beforeEach(async () => {
//         user = await usersController.removeUser(userId);
//       });

//       test('then it should call usersService', () => {
//         expect(urlsService.deleteAllUrls).toHaveBeenCalledWith(userId);
//       });


//       test('then it should call usersService', () => {
//         expect(usersService.deleteUser).toHaveBeenCalledWith(userId);
//       });

//       test('then it should return a user', () => {
//         const resultData = user?.data || {};
//         expect(resultData).toEqual(deleteUserStub());
//       });
//     });
//   });
});
