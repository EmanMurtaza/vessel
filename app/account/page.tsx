import type { Metadata } from 'next'
import { AccountView } from '@/components/account/AccountView'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your VESSEL account — orders, details, and saved addresses.',
}

export default function AccountPage() {
  return <AccountView />
}
