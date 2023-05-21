import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import { MonacoEditor } from './pages/MonacoEditor'

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MonacoEditor />} />
      </Routes>
    </Router>
  )
}
