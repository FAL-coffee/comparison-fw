import { createRoot, type Handle } from '@remix-run/component'
import './app.css'

export function App(handle: Handle) {
    return () => (
        <div>
            <h1>Hello, Remix 3!</h1>
            <p>This is a simple Remix 3 application.</p>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(<App />)
