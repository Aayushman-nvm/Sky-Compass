import Weather from "./Components/Weather"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <div>
      <Weather />
      <SpeedInsights />
      <Analytics />
    </div>
  )
}

export default App
