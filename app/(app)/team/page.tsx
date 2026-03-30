export default function TeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Team</h1>

      <p className="text-white/60">
        Manage your team members, roles, and invitations.
      </p>

      {/* EMPTY STATE */}
      <div className="mt-6 p-6 rounded-xl border border-white/10 bg-white/5">
        <p className="text-white/40 text-sm">
          No team members yet.
        </p>
      </div>
    </div>
  );
}