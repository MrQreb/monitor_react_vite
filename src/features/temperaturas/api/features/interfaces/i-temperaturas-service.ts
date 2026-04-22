import type { TemperaturasCedisDto, TemperaturasDto } from "../dto";


export interface ITemperaturasService {
  
  getTemperaturasPlanta1(): Promise<Partial<TemperaturasDto[]> >;
 
  getTemperaturasTunel1Planta3(): Promise<Partial<TemperaturasDto[]> >;
  
  getTemperaturasTunel2Planta3(): Promise<Partial<TemperaturasDto[]> >;
    
  getTemperaturasCedis1(): Promise<Partial<TemperaturasCedisDto[]> >;


  getTemperaturasCedis2(): Promise<Partial<TemperaturasCedisDto[]> >;

}
