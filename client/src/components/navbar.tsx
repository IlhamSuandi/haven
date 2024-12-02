import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { navContents } from '@/data/nav_contents'

export default function Navbar() {
  return (
    <NavigationMenu className='w-full max-w-full justify-between p-5 lg:px-44 shadow-md sticky top-0 z-10 bg-white'>
      <div>
        <h1 className='text-2xl font-bold'>Haven</h1>
      </div>

      <NavigationMenuList>
        <NavigationMenuItem className='flex items-center justify-center gap-4'>
          {navContents.map(({ title, href }) => (
            <Link key={title} href={href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

