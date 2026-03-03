import { useState } from 'react';
import { HomeScreen } from './mobile/HomeScreen';
import { VehicleScreen } from './mobile/VehicleScreen';
import { DriverScreen } from './mobile/DriverScreen';
import { SuccessScreen } from './mobile/SuccessScreen';
import { CheckoutScreen } from './mobile/CheckoutScreen';
import { ValidationScreen } from './mobile/ValidationScreen';
import { SelfieScreen } from './mobile/SelfieScreen';

type Screen =
  | 'home'
  | 'checkin-vehicle'
  | 'checkin-driver'
  | 'validation-driver'
  | 'checkin-selfie'
  | 'checkin-success'
  | 'checkout'
  | 'checkout-success';

interface FlowData {
  plate: string;
  driverName: string;
  driverCpf: string;
  isNewDriver: boolean;
  checkoutPlate: string;
  checkoutEntryTime: string;
}

const INITIAL_DATA: FlowData = {
  plate: '',
  driverName: '',
  driverCpf: '',
  isNewDriver: false,
  checkoutPlate: '',
  checkoutEntryTime: '',
};

export function MobileApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [data, setData] = useState<FlowData>(INITIAL_DATA);

  return (
    <div className="h-full overflow-hidden">
      {screen === 'home' && (
        <HomeScreen
          onCheckin={(plate) => {
            setData({ ...INITIAL_DATA, plate });
            setScreen('checkin-vehicle');
          }}
          onCheckout={() => {
            setData(INITIAL_DATA);
            setScreen('checkout');
          }}
        />
      )}

      {screen === 'checkin-vehicle' && (
        <VehicleScreen
          initialPlate={data.plate}
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
          onConfirm={(driverName, driverCpf, isNewDriver) => {
            setData((d) => ({ ...d, driverName, driverCpf, isNewDriver }));
            if (isNewDriver) {
              setScreen('validation-driver');
            } else {
              setScreen('checkin-selfie');
            }
          }}
          onBack={() => setScreen('checkin-vehicle')}
        />
      )}

      {screen === 'validation-driver' && (
        <ValidationScreen
          driverName={data.driverName}
          driverCpf={data.driverCpf}
          onSuccess={() => setScreen('checkin-selfie')}
          onBack={() => setScreen('checkin-driver')}
        />
      )}

      {screen === 'checkin-selfie' && (
        <SelfieScreen
          driverName={data.driverName}
          isNewDriver={data.isNewDriver}
          onConfirm={() => setScreen('checkin-success')}
          onBack={() => {
            if (data.isNewDriver) setScreen('validation-driver');
            else setScreen('checkin-driver');
          }}
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