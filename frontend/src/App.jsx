import Home from './pages/home/home'
import './App.css'
import { DndContext } from '@dnd-kit/core';

function App() {

  return (
    <>
    <DndContext>
      <Home/>
    </DndContext>
    
    </>
  )
}

export default App
