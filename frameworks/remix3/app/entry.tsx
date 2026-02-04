import { hydrate } from './lib/remix-component/hydrate-client'

let root = hydrate({
    async loadModule(moduleUrl, exportName) {
        let mod = await import(moduleUrl)
        let Component = mod[exportName]
        if (!Component) {
            throw new Error(`Unknown component: ${moduleUrl}#${exportName}`)
        }
        return Component
    },
})

root.addEventListener('error', (event) => {
    console.error('Hydration error:', event.error)
})
