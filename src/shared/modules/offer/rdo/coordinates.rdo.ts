import { Expose } from 'class-transformer';

export class CoordinatesRdo {
  @Expose()
  public lat: number;

  @Expose()
  public lon: number;
}
