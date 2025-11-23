import LoginForm3 from '@/components/mvpblocks/login-form-3'

type SearchParams = Record<string, string | string[]>

type LoginPageProps = {
  searchParams?: SearchParams | Promise<SearchParams>
}

function isPromise<T>(value: unknown): value is Promise<T> {
  return typeof value === 'object' && value !== null && 'then' in value
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedParams: SearchParams | undefined = searchParams
    ? isPromise<SearchParams>(searchParams)
      ? await searchParams
      : searchParams
    : undefined
  const rawCallback = resolvedParams?.callbackUrl
  const callbackUrlValue = Array.isArray(rawCallback) ? rawCallback[0] : rawCallback
  const callbackUrl = typeof callbackUrlValue === 'string' && callbackUrlValue.length > 0 ? callbackUrlValue : '/dashboard'
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Passw0rd!'

  return <LoginForm3 mode="login" />
}
