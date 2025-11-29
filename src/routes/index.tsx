import { createFileRoute } from '@tanstack/react-router'

const App = () => {
  return <div>Hello, World!</div>
}
export const Route = createFileRoute('/')({ component: App })
