import Link from "next/link";

export default async function Home() {

  return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <Link href="/login">Login</Link>
        </div>

        <div>
          <Link href="/todo">Todo</Link>
        </div>

      </div>
  )
}