import { Link } from '@heroui/link'
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent } from '@heroui/navbar'
import { Button } from '@heroui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import { useAuthToken } from '@/utils/useAuthToken.tsx'
import { Logo } from '@/components/icons'
import { ThemeSwitch } from './theme-switch'
type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

const NavLink = ({ href, children, className = '', icon }: NavLinkProps) => {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <Link
      href={href}
      className={`mr-4 flex items-center rounded-md px-3 py-2 transition-all ${isActive ? 'bg-primary font-semibold text-white shadow-md' : 'text-foreground hover:bg-gray-200 hover:text-black'} ${className} `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  )
}

export const Navbar = () => {
  const { hasToken, removeToken, getAuthData } = useAuthToken()
  const routeTo = hasToken ? '/home' : '/'
  const navigate = useNavigate()
  const authData = getAuthData()
  const userRole = authData.role

  const handleLogout = () => {
    removeToken()
    addToast({
      title: 'Logout Success',
      color: 'danger',
    })
    navigate('/', { replace: true })
  }

  const isMerchant = hasToken && userRole === 'merchant'

  return (
    <HeroUINavbar
      className={'border-gray-700 shadow-sm dark:border-b-1'}
      height={100}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="w-32 gap-3">
          <Link className="flex justify-start gap-1" color="foreground" href={routeTo}>
            <Logo width={60} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <p className="text-xl font-bold">E-Receipt Portal</p>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        {isMerchant && (
          <>
            <NavLink href="/report">Report</NavLink>
            <NavLink href="/list">List</NavLink>
          </>
        )}
        {hasToken && (
          <Button color={'danger'} variant={'flat'} onPress={handleLogout}>
            Logout
          </Button>
        )}
        <ThemeSwitch />
      </NavbarContent>

      {/* <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end"> */}

      {/*  <NavbarMenuToggle />*/}
      {/*</NavbarContent>*/}

      {/* <NavbarMenu>
       <div className="mx-4 mt-2 flex flex-col gap-2"> */}
      {/*    {siteConfig.navMenuItems.map((item, index) => (*/}
      {/*      <NavbarMenuItem key={`${item}-${index}`}>*/}
      {/*        <Link*/}
      {/*          color={*/}
      {/*            index === 2*/}
      {/*              ? 'primary'*/}
      {/*              : index === siteConfig.navMenuItems.length - 1*/}
      {/*                ? 'primary'*/}
      {/*                : 'foreground'*/}
      {/*          }*/}
      {/*          href="#"*/}
      {/*          size="lg"*/}
      {/*        >*/}
      {/*          {item.label}*/}
      {/*        </Link>*/}
      {/*      </NavbarMenuItem>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</NavbarMenu>*/}
    </HeroUINavbar>
  )
}
