import ShoppingList from './components/ShoppingList';
import Reminders from './components/Reminders';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Fred's Fridge</h1>
      <div className='fridge'>
        <h2>Fridge</h2>
      </div>
      <ShoppingList />
      <Reminders />
    </div>
  );
}

export default App;
