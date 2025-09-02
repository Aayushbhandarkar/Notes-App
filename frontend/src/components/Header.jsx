import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../context/AuthContext'
import { logoutUser } from '../utils/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    try {
      await logoutUser()    
      setUser(null)         
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight hover:text-primary-400 transition-colors duration-300 cursor-pointer">
              Notes App
            </h1>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-transform hover:scale-105">
                    
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <span className="text-white font-bold text-base">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Name */}
                    <span className="ml-3 text-sm font-medium text-white hover:text-primary-400 transition-colors duration-300">
                      {user.name}
                    </span>

                    <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-300" aria-hidden="true" />
                  </Menu.Button>
                </div>

                {/* Dropdown */}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 py-1 shadow-xl ring-1 ring-black ring-opacity-20 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            active ? 'bg-gray-700' : '',
                            'block px-4 py-2 text-sm text-white w-full text-left font-medium hover:text-red-500 transition-colors duration-200 rounded-md'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
