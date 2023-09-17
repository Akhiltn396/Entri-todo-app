import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/main/Main'
import {QueryClient,QueryClientProvider,useQuery} from "@tanstack/react-query"

function App() {


  const queryClient = new QueryClient()

  return (
    <>


<div className="app">
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </div>



    </>
  )
}


export default App
