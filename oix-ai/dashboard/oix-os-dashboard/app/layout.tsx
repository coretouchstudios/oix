import '../styles/global.css'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

export default function RootLayout({children}:{children:React.ReactNode}){
return(
<html>
<body>
<Navbar/>
<div className='layout'>
<Sidebar/>
<main>{children}</main>
</div>
</body>
</html>
)
}
