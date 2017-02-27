import { MomusPage } from './app.po';

describe('momus App', () => {
  let page: MomusPage;

  beforeEach(() => {
    page = new MomusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
