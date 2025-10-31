import { Link } from '@heroui/link'
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent } from '@heroui/navbar'
import { Button } from '@heroui/button'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import { useAuthToken } from '@/utils/useAuthToken.tsx'
import { Logo } from '@/components/icons'
import { ThemeSwitch } from './theme-switch'

export const Navbar = () => {
  const { hasToken, removeToken } = useAuthToken()
  const routeTo = hasToken ? '/home' : '/'
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    addToast({
      title: 'Logout Success',
      color: 'danger',
    })
    navigate('/', { replace: true })
  }

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
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <p className="text-xl font-bold">E-Receipt Portal</p>
      </NavbarContent>

      <NavbarContent className="hidden basis-1/5 sm:flex sm:basis-full" justify="end">
        {hasToken && (
          <Button color={'danger'} variant={'flat'} onClick={handleLogout}>
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
