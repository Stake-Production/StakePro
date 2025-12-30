"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

interface User {
  email: string;
  password: string;
  code?: string; // ✅ added
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/fetchUsers", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }
        console.log("Fetched users:", data.users);
        setUsers(data.users);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stored Users</h1>

        {loading && <div className="text-gray-400">Loading users...</div>}

        {error && (
          <div className="mb-6 p-4 rounded bg-red-500/10 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full border-collapse">
              <thead className="bg-[#1E293B]">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Password</th>
                  <th className="p-4 text-left">Code</th> {/* ✅ added */}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-800 hover:bg-[#1E293B]"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4 font-mono text-yellow-400">
                      {user.password}
                    </td>
                    <td className="p-4 font-mono text-green-400">
                      {user.code || "—"} {/* ✅ safe display */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
