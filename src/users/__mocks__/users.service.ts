import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  insertUser: jest.fn().mockResolvedValue(userStub().email),
  getUsers: jest.fn().mockResolvedValue([userStub()]),
  getSingleUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  deleteUser: jest.fn().mockResolvedValue(userStub()),
});
