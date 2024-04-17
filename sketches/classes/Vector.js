export class Vector {
  constructor(x, y, radius) {
    {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }
  }

  getDistance(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}