import { useState } from 'react';
import { HomeScreen } from './mobile/HomeScreen';
import { VehicleScreen } from './mobile/VehicleScreen';
import { DriverScreen } from './mobile/DriverScreen';
import { SuccessScreen } from './mobile/SuccessScreen';
import { CheckoutScreen } from './mobile/CheckoutScreen';
import { ValidationScreen } from './mobile/ValidationScreen';

type Screen =
  | 'home'
  | 'checkin-vehicle'
  | 'checkin-driver'
  | 'validation-driver'
  | 'checkin-success'
  | 'checkout'
  | 'checkout-success';

interface FlowData {
  plate: string;
  driverName: string;
  driverScore: number;
  checkoutPlate: string;
  checkoutEntryTime: string;
}

const INITIAL_DATA: FlowData = {
  plate: '',
  driverName: '',
  driverScore: 0,
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
          onConfirm={(driverName, driverScore) => {
            setData((d) => ({ ...d, driverName, driverScore }));
            setScreen('checkin-success');
          }}
          onBack={() => setScreen('checkin-vehicle')}
        />
      )}

     {screen === 'checkin-driver' && (
        <DriverScreen
          plate={data.plate}
          onConfirm={(driverName, driverScore) => {
            setData((d) => ({ ...d, driverName, driverScore }));
            setScreen('checkin-success');
          }}
          onBack={() => setScreen('checkin-vehicle')}
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
