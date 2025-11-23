import VerifyClient from "@/components/VerifyClient";

export default async function VerifyPage({ searchParams }: { searchParams: any }) {
  // `searchParams` may be a Promise in newer Next.js versions — await it
  // to safely access properties server-side.
  const params = await Promise.resolve(searchParams);
  const email = String(params?.email ?? "");
  return (
    <main className="p-8">
      <VerifyClient email={email} />
    </main>
  );
}
