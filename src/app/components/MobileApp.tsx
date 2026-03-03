import { useState } from 'react';
import { HomeScreen } from './HomeScreen';
import { VehicleScreen } from './VehicleScreen';
import { DriverScreen } from './DriverScreen';
import { SuccessScreen } from './SuccessScreen';
import { CheckoutScreen } from './CheckoutScreen';
import { ValidationScreen } from './ValidationScreen';
import { ErrorScreen } from './ErrorScreen';

type Screen =
  | 'home'
  | 'checkin-vehicle'
  | 'checkin-driver'
  | 'validation-driver'
  | 'checkin-failure'
  | 'checkin-success'
  | 'checkout'
  | 'checkout-success';

interface FlowData {
  plate: string;
  driverName: string;
  driverCpf: string;
  driverScore: number;
  checkoutPlate: string;
  checkoutEntryTime: string;
}

const INITIAL_DATA: FlowData = {
  plate: '',
  driverName: '',
  driverCpf: '',
  driverScore: 0,
  checkoutPlate: '',
  checkoutEntryTime: '',
};

export function MobileApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [data, setData] = useState<FlowData>(INITIAL_DATA);
  const [failReason, setFailReason] = useState("");

  return (
    <div className="h-full overflow-hidden">
      {screen === 'home' && (
        <HomeScreen
          onCheckin={() => setScreen('checkin-vehicle')}
          onCheckout={() => setScreen('checkout')}
        />
      )}

      {screen === 'checkin-vehicle' && (
        <VehicleScreen
          onApproved={(plate) => {
            setData((d) => ({ ...d, plate }));
            setScreen('checkin-driver');
          }}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'checkin-driver' && (
        <DriverScreen
          plate={data.plate}
          onConfirm={(driverName, driverCpf, driverScore) => {
            setData((d) => ({ ...d, driverName, driverCpf, driverScore }));
            
            // Regra do Score escondido! 
            // Se maior que 2000 (Ex: CPF começando com 999), vai para o erro.
            if (driverScore > 2000) {
              setFailReason("Acesso negado: Restrições de segurança ativas (Score Elevado).");
              setScreen('checkin-failure');
            } else {
              setScreen('validation-driver');
            }
          }}
          onBack={() => setScreen('checkin-vehicle')}
        />
      )}

      {screen === 'validation-driver' && (
        <ValidationScreen
          driverName={data.driverName}
          driverCpf={data.driverCpf}
          onSuccess={() => setScreen('checkin-success')}
          onFail={(reason) => {
            setFailReason(reason);
            setScreen('checkin-failure');
          }}
          onBack={() => setScreen('checkin-driver')}
        />
      )}

      {screen === 'checkin-success' && (
        <SuccessScreen
          type="checkin"
          plate={data.plate}
          driverName={data.driverName}
          onNewOperation={() => {
            setData(INITIAL_DATA);
            setScreen('checkin-vehicle');
          }}
          onHome={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
        />
      )}

      {screen === 'checkin-failure' && (
        <ErrorScreen
          message={failReason}
          onHome={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
        />
      )}

      {screen === 'checkout' && (
        <CheckoutScreen
          onConfirm={(plate, entryTime) => {
            setData((d) => ({ ...d, checkoutPlate: plate, checkoutEntryTime: entryTime }));
            setScreen('checkout-success');
          }}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'checkout-success' && (
        <SuccessScreen
          type="checkout"
          plate={data.checkoutPlate}
          entryTime={data.checkoutEntryTime}
          onNewOperation={() => {
            setData((d) => ({ ...d, checkoutPlate: '', checkoutEntryTime: '' }));
            setScreen('checkout');
          }}
          onHome={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
        />
      )}
    </div>
  );
}