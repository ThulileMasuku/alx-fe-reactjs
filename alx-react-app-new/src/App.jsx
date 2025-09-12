import React from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import WelcomeMessage from "./components/WelcomeMessage"; // if exists

function App() {
  return (
    <div className="App">
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <UserProfile name="Bob" age={30} bio="Enjoys cooking and traveling" />
      <UserProfile name="Charlie" age={28} bio="Passionate about music and art" />
    </div>
  );
}

export default App;
