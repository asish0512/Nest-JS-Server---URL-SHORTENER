// import { Test, TestingModule } from '@nestjs/testing';
// import { UrlsService } from '../urls.service';
// import { UrlsController } from '../urls.controller';
// import { createUrlDto, createUrlStub } from './stubs/urls.stub';

// describe('UrlsController', () => {
//   let urlsController: UrlsController;
//   let urlsService: UrlsService;

//   beforeAll(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [],
//       controllers: [UrlsController],
//       providers: [
//         {
//           provide: UrlsService,
//           useValue: {
//             insertUrl: jest
//               .fn()
//               .mockImplementation((longUrl: string, userId: string) =>
//                 Promise.resolve({
//                   status: 201,
//                   message: 'Url has been created sucessfully',
//                   data: {
//                     shorturl: 'https://bitly.com/ef77b8b87ca9',
//                     longUrl,
//                     userId,
//                   },
//                 }),
//               ),
//           },
//         },
//       ],
//     }).compile();

//     urlsController = moduleRef.get<UrlsController>(UrlsController);
//     urlsService = moduleRef.get<UrlsService>(UrlsService);
//     jest.clearAllMocks();
//   });

//   describe('createUrl', () => {
//     describe('when createUrl is called', () => {
//       const longUrl = createUrlDto()?.longUrl;
//       const userId = createUrlDto()?.userId;
//       let url;
//       beforeEach(async () => {
//         url = await urlsController.addShortUrl(longUrl, userId);
//       });

//       test('then it should call urlsService', () => {
//         expect(urlsService.insertUrl).toHaveBeenCalledWith(longUrl, userId);
//       });

//       test('then it should return a short url', () => {
//         console.log(url);
//         const resultData = url?.data || {};
//         console.log(resultData);
//         expect(resultData).toEqual(createUrlStub());
//       });
//     });
//   });
// });
