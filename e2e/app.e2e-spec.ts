import { TinyTranslatorPage } from './app.po';

describe('tiny-translator App', () => {
  let page: TinyTranslatorPage;

  beforeEach(() => {
    page = new TinyTranslatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
