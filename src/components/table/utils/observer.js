// eslint-disable-next-line max-classes-per-file
class Observable {
  constructor() {
    this.observers = [];
  }

  send = msg => {
    this.observers.forEach(el => {
      console.log(el);
      el.notify(msg);
    });
  };

  addObserver(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(behavior) {
    this.behavior = behavior;
  }

  notify = msg => {
    this.behavior(msg);
    console.log(this.behavior);
  };
}

export { Observable, Observer };
