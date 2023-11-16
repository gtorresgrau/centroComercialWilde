import React from "react";
import Link from "next/link";
import Contactus from './Contactus';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '#home', current: true },
  { name: 'Locales', href: '#locales', current: false },
  { name: 'Comentarios', href: '#comentarios', current: false },
  { name: 'Newsletter', href:'#newsletter', current: false },
  { name: 'Ubicacion', href:'#ubicacion', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Data = () => {
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-purple' : 'text-black hover:bg-gray-700 hover:text-purple',
                  'block  py-2 rounded-md text-base font-medium'
                )} aria-current={item.current ? 'page' : undefined}>
                {item.name.toUpperCase()}
              </Link>
            ))}
            <Contactus/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;