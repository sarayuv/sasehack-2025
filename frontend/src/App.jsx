import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Fred's Fridge</h1>
      <div className='fridge'>
        <h2>Fridge</h2>
      </div>
      <ShoppingList />
    </div>
  );
}

export default App;
