export const storeKeys = {
  token: 'rastreei:token',
  user: 'rastreei:user',
  loginData: 'rastreei:login-data',
  parametros: 'rastreei:parametros'
}

export const mock = {
  typeVehicle: [
    { id: '', value: 'TODOS' },
    { id: 21, value: 'CAMINHAO' },
    { id: 22, value: 'CARRO' },
    { id: 23, value: 'MOTO' },
    { id: 24, value: 'VAN' },
    { id: 25, value: 'PICKUP' },
    { id: 1, value: 'OUTROS' },
  ],
  lista_movimento: [{ cod_movimento: '00', movimento: 'Cancelar' }, { cod_movimento: '01', movimento: 'Ativar' }],
  lista_velocidade: [{ cod_velocidade: '00', velocidade: 'Cancelar' }
    , { cod_velocidade: '06', velocidade: '60 km/h' }
    , { cod_velocidade: '08', velocidade: '80 km/h' }
    , { cod_velocidade: '09', velocidade: '90 km/h' }
    , { cod_velocidade: '0A', velocidade: '100 km/h' }
    , { cod_velocidade: '0B', velocidade: '110 km/h' }
    , { cod_velocidade: '0C', velocidade: '120 km/h' }
    , { cod_velocidade: '0D', velocidade: '130 km/h' }
    , { cod_velocidade: '0E', velocidade: '140 km/h' }
    , { cod_velocidade: '0F', velocidade: '150 km/h' }
  ],
  tempo_url: [
    { id: 12, value: '12h' },
    { id: 24, value: '24h' },
    { id: 72, value: '72h' },
  ]
}