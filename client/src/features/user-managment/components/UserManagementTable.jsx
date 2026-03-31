import React from "react";
import { useSelector } from "react-redux";
import { UserInfoCell } from "./UserInfoCell";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionsDropdown } from "./UserActionsDropdown";

export const UserManagementTable = ({ selectedUsers, setSelectedUsers }) => {
  const { users } = useSelector((state) => state.admin || { users: [] });
console.log(users);

  const handleSelectAll = (e) => {
    setSelectedUsers(e.target.checked ? users.map((u) => u.id) : []);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 w-12">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
            </th>
            <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              since
            </th>
            <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {users.map((user) => {
            const isSelected = selectedUsers.includes(user.id);
            return (
              <tr
                key={user.id}
                className={`transition-colors group hover:bg-slate-50/50 ${isSelected ? "bg-indigo-50/30" : ""}`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserInfoCell user={user} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium text-slate-800">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(user.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <UserStatusBadge status={user.state} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <UserActionsDropdown user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Empty State Fallback */}
      {(!users || users.length === 0) && (
        <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500">
          <p className="text-sm font-medium">No users found.</p>
        </div>
      )}
    </div>
  );
};
