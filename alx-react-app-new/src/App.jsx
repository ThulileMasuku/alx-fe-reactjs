import './App.css';
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter'; // ✅ Import Counter

function App() {
  return (
    <div className="App">
      {/* Task 1: WelcomeMessage */}
      <WelcomeMessage />

      {/* Task 2: Header, MainContent, Footer */}
      <Header />
      <MainContent />
      <Footer />

      {/* Task 3: UserProfile components */}
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <UserProfile name="Bob" age={30} bio="Enjoys cooking and traveling" />
      <UserProfile name="Charlie" age={28} bio="Passionate about music and art" />

      {/* ✅ Task 4: Counter component */}
      <Counter />
    </div>
  );
}

export default App;
