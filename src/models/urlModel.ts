import { ValidSignModel } from './ValidSignModel';
import { IgnitionModel } from './IgnitionModel';
import * as moment from 'moment';

export class urlModel {
  id_link_externo: number;
    id_usuario: number;
    id_veiculo: number;
    dt_criacao: string;
    chave_acesso: string;
    tempo_acesso: string;
    id_grupo_resposta: number;
    dt_sms_roubo: string;
    flg_status: IgnitionModel;
    flg_roubo: IgnitionModel;

}