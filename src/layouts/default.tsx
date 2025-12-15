import { Link } from '@heroui/link'

import { Navbar } from '@/components/navbar'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="w-full px-6 pt-2">{children}</main>
      <footer className="mt-8 flex w-full items-center justify-center gap-1 py-3">
        <p className="text-default-600">© 2025 All Rights Reserved to </p>
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.kbzbank.com/en/"
          title="heroui.com homepage"
        >
          <p className="text-primary"> KBZ </p>
        </Link>
      </footer>
    </div>
  )
}
