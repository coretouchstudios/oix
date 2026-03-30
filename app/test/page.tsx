import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}