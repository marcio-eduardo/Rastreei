import { ValidSignModel } from './ValidSignModel';
import { IgnitionModel } from './IgnitionModel';
import * as moment from 'moment';

export class VehicleLocalizationModel {
  id_rastreador: number;
  id_localizacao: string;
  id_veiculo: number;
  nome: string;
  placa: string;
  tipo_veiculo: string;
  image: string;
  unique_id: string;
  longitude: number;
  latitude: number;
  ignicao?: IgnitionModel;
  velocidade: number;
  bateria: number;
  sinal_valido: ValidSignModel;
  endereco: string;
  dt_localizacao: string;
  total_seconds: number;
  total_alerta: number;

}
