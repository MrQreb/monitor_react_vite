import type { TemperaturasCedisDto, TemperaturasDto } from "../dto";

export interface ITemperaturasWSService {

  onTemperaturasPlanta1(
    callback: (data: TemperaturasDto[]) => void
  ): () => void;

  onTemperaturasTunel1Planta3(
    callback: (data: TemperaturasDto[]) => void
  ): () => void;

  onTemperaturasTunel2Planta3(
    callback: (data: TemperaturasDto[]) => void
  ): () => void;

  onTemperaturasCedis1(
    callback: (data: TemperaturasCedisDto[]) => void
  ): () => void;

  onTemperaturasCedis2(
    callback: (data: TemperaturasCedisDto[]) => void
  ): () => void;

}