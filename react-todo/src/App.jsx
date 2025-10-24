import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm'; // Import the new component
import './App.css';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Form Handling in React</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;