export const createUserStub = () => {
  return {
    status: 201,
    message: 'User has been created sucessfully',
    data: {
      name: 'Asish',
      email: 'asish@gmail.com',
      createdAt: '2023-04-20T19:48:46.360Z',
      _id: '6441971ecbc71a71948b3043',
      __v: 0,
    },
  };
};

export const updateUserStub = () => {
  return {
    status: 200,
    message: 'User has been updated sucessfully',
    data: {
      name: 'Asish',
      email: 'asish@gmail.com',
      createdAt: '2023-04-20T19:48:46.360Z',
      _id: '6441971ecbc71a71948b3043',
      __v: 0,
    },
  };
};

export const getAllUsersStub = () => {
  return {
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
  };
};

export const getSingleUserStub = () => {
  return {
    status: 200,
    message: 'User details retrieved sucessfully',
    data: {
      id: '643fce59c2e72bb36bbc5da8',
      name: 'asish5',
      email: 'asish5@gmail.com',
      createdAt: '2023-04-19T11:19:53.915Z',
    },
  };
};

export const deleteUserStub = () => {
  return {
    status: 200,
    message: 'User details of 6441971ecbc71a71948b3043 deleted successfully',
  };
};
