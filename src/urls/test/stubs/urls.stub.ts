export const createUrlStub = () => {
  return {
    status: 201,
    message: 'Url has been created sucessfully',
    data: {
      shorturl: 'https://bitly.com/ef77b8b87ca9',
      longUrl:
        'https://stackoverflow.com/questions/72598971/nestjs-unit-testing-error-typeerror-this-x-is-not-a-function',
      userId: '643fb69bbce87172b8fbdfc2',
    },
  };
};

export const createUrlDto = () => {
  return {
    longUrl:
      'https://stackoverflow.com/questions/72598971/nestjs-unit-testing-error-typeerror-this-x-is-not-a-function',
    userId: '643fb69bbce87172b8fbdfc2',
  };
};
