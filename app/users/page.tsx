"use client";

export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
//import { useSearchParams, useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //const searchParams = useSearchParams();
  //const router = useRouter();

  useEffect(() => {
    //const key = searchParams.get("key");
    //const expectedKey = process.env.USERS_PAGE_KEY;

    // 🔒 Block access if env key is missing OR incorrect
    // if (!expectedKey || !key || key !== expectedKey) {
    //   router.replace("/");
    //   return;
    // }

    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/fetchUsers", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

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
      <div className="max-w-5xl mx-auto">
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
