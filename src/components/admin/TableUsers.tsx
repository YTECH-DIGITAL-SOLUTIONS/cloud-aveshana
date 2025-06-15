/** @format */

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import UserFormModal, { type UserFormData } from "./UserFormModal";

interface TableUsersProps {
  refreshKey?: number;
}

export default function TableUsers({ refreshKey }: TableUsersProps) {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const [filtered, setFiltered] = useState<UserFormData[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [sortAZ, setSortAZ] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/users"); // ✅ perbaikan endpoint
      setUsers(res.data);
      setFiltered(res.data);
    } catch (err) {
      toast.error("Gagal memuat pengguna");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  useEffect(() => {
    let result = [...users];

    if (search.trim()) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterStatus !== "Semua") {
      result = result.filter(
        (u) => u.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    result.sort((a, b) =>
      sortAZ ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setFiltered(result);
  }, [search, filterStatus, sortAZ, users]);

  const handleToggleStatus = async (user: UserFormData) => {
    try {
      await api.put(`/api/admin/users/${user.id}/status`, {
        status: user.status === "Aktif" ? "Nonaktif" : "Aktif",
        role: user.role,
      });
      toast.success("Status diperbarui");
      fetchUsers();
    } catch {
      toast.error("Gagal memperbarui status");
    }
  };

  const handleResetPassword = async (id: number, role: string) => {
    try {
      await api.post(`/api/admin/users/${id}/reset-password`, { role });
      toast.success("Password berhasil direset ke default");
    } catch {
      toast.error("Gagal reset password");
    }
  };

  const handleDelete = async (id: number, role: string) => {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    try {
      await api.delete(`/api/admin/users/${id}`, {
        data: { role },
      });
      toast.success("Pengguna dihapus");
      fetchUsers();
    } catch {
      toast.error("Gagal menghapus pengguna");
    }
  };

  return (
    <>
      {/* 🔍 Filter bar */}
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari nama/email..."
            className="border px-3 py-2 rounded-md text-sm w-[220px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm"
          >
            <option value="Semua">Semua</option>
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
          <button
            onClick={() => setSortAZ(!sortAZ)}
            className="text-sm text-blue-600 hover:underline"
          >
            Sortir: {sortAZ ? "A - Z" : "Z - A"}
          </button>
        </div>
      </div>

      {/* 📋 Tabel pengguna */}
      <div className="overflow-x-auto rounded-md shadow bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Memuat...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={`${user.role}-${user.id}`}
                  className="border-t border-gray-200 dark:border-gray-600"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">{user.status ?? "Aktif"}</td>
                  <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      className="text-yellow-600 hover:underline"
                    >
                      {user.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.id!, user.role)}
                      className="text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenForm(true);
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    {user.role === "user" && (
                      <button
                        onClick={() => handleDelete(user.id!, user.role)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 Modal Form Tambah/Edit */}
      {openForm && (
        <UserFormModal
          onClose={() => setOpenForm(false)}
          onSuccess={() => {
            fetchUsers();
            setOpenForm(false);
          }}
          initialData={selectedUser}
        />
      )}
    </>
  );
}
