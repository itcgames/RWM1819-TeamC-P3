class Bomb
{
  constructor( imageOptions, fps, tile)
  {
    this.x = 0;
    this.y = 0;
    this.gridPos = {};
    this.gridPos.x;
    this.gridPos.y;
    this.alive = false;
    this.exploding = false;

    this.img = imageOptions.image;
    this.fps = fps;

    this.width = imageOptions.width;
    this.height = imageOptions.height;

    this.time = 0;
    this.timeExplode = 0;
    this.fuse = 1000 * this.fps;
    this.explosionTime = 100 * this.fps;
    this.ticksPerFrame = 1000/this.fps;
    this.tileWidth = tile.width;
    this.tileHeight = tile.height;
  }

  place(pos)
  {
    this.alive = true;
    this.time = 0;
    this.timeExplode = 0;
    this.gridPos.x = pos.x;
    this.gridPos.y = pos.y;
    this.x = (this.gridPos.x * this.tileWidth * .8) + 10;
    this.y = (this.gridPos.y * this.tileHeight * .8) + 90;
  }

  update()
  {
    if(this.alive || this.exploding)
    {
      if(this.time > this.fuse)
      {
        this.alive = false;
        this.timeExplode = this.timeExplode + this.ticksPerFrame;
        this.exploding = true;
        if (this.timeExplode > this.explosionTime)
        {
          this.exploding = false;
        }
      }
      this.time = this.time + this.ticksPerFrame;
    }

  }

  onExplode(level, i)
  {
    if(this.exploding)
    {
      level[i].containsBomb = false;
      level[i].containsWall = false;
      return this.gridPos;



    }
    else {
      return {x:-10, y:-10};
    }
  }

  draw()
  {
    if(this.alive)
    {
      var canvas = document.getElementById('mycanvas');
      var ctx = canvas.getContext('2d');

      ctx.drawImage(this.img, 0, 0,this.width, this.height ,this.x,this.y, this.width / 5,this.height / 5);
    }

  }
}
