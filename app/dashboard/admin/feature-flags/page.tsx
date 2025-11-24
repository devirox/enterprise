import FeatureFlagsClient from '@/components/dashboard/admin/FeatureFlagsClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Feature Flags</h1>
      <FeatureFlagsClient />
    </div>
  )
}
