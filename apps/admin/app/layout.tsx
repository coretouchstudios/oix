import "./globals.css"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>

        <div className="admin">

          <Sidebar />

          <div className="main">
            <Header />
            {children}
          </div>

        </div>

      </body>
    </html>
  )
}