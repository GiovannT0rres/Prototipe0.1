import { useState } from 'react';
import { HomeScreen } from './mobile/HomeScreen';
import { VehicleScreen } from './mobile/VehicleScreen';
import { IdentityPickScreen } from './mobile/IdentityPickScreen';
import { SecurityQuestionScreen } from './mobile/SecurityQuestionScreen';
import { CompanySelectScreen } from './mobile/CompanySelectScreen';
import { AuthorizerSelectScreen } from './mobile/AuthorizerSelectScreen';
import { SelfieScreen } from './mobile/SelfieScreen';
import { SuccessScreen } from './mobile/SuccessScreen';
import { CheckoutScreen } from './mobile/CheckoutScreen';

type Screen =
  | 'home'
  // User flow
  | 'identity-pick'
  | 'security-question'
  | 'checkin-selfie'
  // Authorization flow
  | 'company-select'
  | 'authorizer-select'
  // Vehicle flow
  | 'checkin-vehicle'
  | 'checkin-success'
  // Checkout flow
  | 'checkout'
  | 'checkout-success'
  // History flow
  | 'operation-details';

interface FlowData {
  cpf: string;
  driverName: string;
  isNewDriver: boolean;
  company: string;
  authorizer: string;
  plate: string;
  checkoutPlate: string;
  checkoutEntryTime: string;
}

const INITIAL_DATA: FlowData = {
  cpf: '',
  driverName: '',
  isNewDriver: false,
  company: '',
  authorizer: '',
  plate: '',
  checkoutPlate: '',
  checkoutEntryTime: '',
};

// Simulate looking up a driver by CPF
function resolveDriver(cpf: string): { name: string; isNew: boolean } {
  const digits = cpf.replace(/\D/g, '');
  if (digits === '1234') {
    return { name: 'João Carlos Silva', isNew: false };
  }
  return { name: 'Pedro Henrique Santos', isNew: true };
}

export function MobileApp() {
  const [screen, setScreen] = useState<Screen>('home');
  const [data, setData] = useState<FlowData>(INITIAL_DATA);
  const [selectedOp, setSelectedOp] = useState<any>(null);

  return (
    <div className="h-full overflow-hidden">

      {/* ── HOME ── */}
      {screen === 'home' && (
        <HomeScreen
          onCheckin={(cpf) => {
            const driver = resolveDriver(cpf);
            setData({ ...INITIAL_DATA, cpf, driverName: driver.name, isNewDriver: driver.isNew });
            // Existing driver → skip identity flow, go straight to selfie
            if (!driver.isNew) {
              setScreen('checkin-selfie');
            } else {
              setScreen('identity-pick');
            }
          }}
          onCheckout={() => {
            setData(INITIAL_DATA);
            setScreen('checkout');
          }}
          onViewOp={(op) => {
            setSelectedOp(op);
            setScreen('operation-details');
          }}
        />
      )}

      {/* ── USER FLOW ── */}
      {screen === 'identity-pick' && (
        <IdentityPickScreen
          driverName={data.driverName}
          onSuccess={() => setScreen('security-question')}
          onFail={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'security-question' && (
        <SecurityQuestionScreen
          onSuccess={() => setScreen('checkin-selfie')}
          onFail={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
          onBack={() => setScreen('identity-pick')}
        />
      )}

      {screen === 'checkin-selfie' && (
        <SelfieScreen
          driverName={data.driverName}
          isNewDriver={data.isNewDriver}
          onConfirm={() => setScreen('company-select')}
          onBack={() => {
            if (data.isNewDriver) setScreen('security-question');
            else setScreen('home');
          }}
        />
      )}

      {/* ── AUTHORIZATION FLOW ── */}
      {screen === 'company-select' && (
        <CompanySelectScreen
          isNewDriver={data.isNewDriver}
          onSelect={(company) => {
            setData((d) => ({ ...d, company }));
            setScreen('authorizer-select');
          }}
          onBack={() => setScreen('checkin-selfie')}
        />
      )}

      {screen === 'authorizer-select' && (
        <AuthorizerSelectScreen
          isNewDriver={data.isNewDriver}
          onSelect={(authorizer) => {
            setData((d) => ({ ...d, authorizer }));
            setScreen('checkin-vehicle');
          }}
          onBack={() => setScreen('company-select')}
        />
      )}

      {/* ── VEHICLE FLOW ── */}
      {screen === 'checkin-vehicle' && (
        <VehicleScreen
          isNewDriver={data.isNewDriver}
          onApproved={(plate) => {
            setData((d) => ({ ...d, plate }));
            setScreen('checkin-success');
          }}
          onBack={() => setScreen('authorizer-select')}
        />
      )}

      {screen === 'checkin-success' && (
        <SuccessScreen
          type="checkin"
          plate={data.plate}
          driverName={data.driverName}
          onNewOperation={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
          onHome={() => {
            setData(INITIAL_DATA);
            setScreen('home');
          }}
        />
      )}

      {/* ── CHECKOUT FLOW ── */}
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

      {/* ── HISTORY DETAILS ── */}
      {screen === 'operation-details' && selectedOp && (
        <SuccessScreen
          type={selectedOp.type === 'in' ? 'checkin' : 'checkout'}
          plate={selectedOp.plate}
          driverName={selectedOp.type === 'in' ? selectedOp.desc : undefined}
          isReceipt={true}
          onNewOperation={() => setScreen('home')}
          onHome={() => setScreen('home')}
        />
      )}
    </div>
  );
}