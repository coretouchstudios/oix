export default function TeamPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Team</h1>

      <p className="mt-4 text-gray-500">
        Welcome to your team dashboard.
      </p>

      <div className="mt-6 grid gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Members</h2>
          <p className="text-sm text-gray-500">
            Manage your team members here.
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Invites</h2>
          <p className="text-sm text-gray-500">
            Send and manage invitations.
          </p>
        </div>
      </div>
    </main>
  );
}