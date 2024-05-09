import AppHandler from './appHandler';

export default class App {
  init() {
    this.widget = document.querySelector('.validator');
    this.appHandler = new AppHandler(this.widget);
    this.appHandler.addListeners();
  }
}
const app = new App();
app.init();
