class Midleware {
  midlewares: any = [];
  register = (midleware: any) => {
    this.midlewares.push(midleware);
  };
  getAll = () => {
    return this.midlewares;
  };
}

const MidlewareConfig = new Midleware();

export default MidlewareConfig;
