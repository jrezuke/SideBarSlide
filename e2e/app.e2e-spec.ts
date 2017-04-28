import { SideBarSlidePage } from './app.po';

describe('side-bar-slide App', () => {
  let page: SideBarSlidePage;

  beforeEach(() => {
    page = new SideBarSlidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
