import { Link, useLocation } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { LayoutDashboard, ListChecks, FileText, Clock } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  
  const isActive = (path: string) => 
    location.pathname === path ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <LayoutDashboard className="h-6 w-6 text-primary-500 mr-2" />
              <span className="font-bold text-xl text-gray-900">Dev-Dash</span>
            </div>
            
            <SignedIn>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-1">
                  <Link to="/todo" className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/todo')}`}>
                    <ListChecks className="h-4 w-4 mr-2" />
                    To-Do
                  </Link>
                  <Link to="/notes" className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/notes')}`}>
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </Link>
                  <Link to="/timer" className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${isActive('/timer')}`}>
                    <Clock className="h-4 w-4 mr-2" />
                    Timer
                  </Link>
                </div>
              </div>
            </SignedIn>
          </div>
          
          <div className="flex items-center">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">
                <button className="btn-primary">Sign In</button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
} 