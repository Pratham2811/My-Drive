import React from "react";
import { UserInfoCell } from "./UserInfoCell";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionsDropdown } from "./UserActionsDropdown";
import { UserRoleBadge } from "./UserRoleCell";

export const UserRow = ({ user, isSelected, onSelect }) => {
  console.log("gbdngfnf", user.state);

  return (
    <tr
      className={`transition-colors duration-200 group hover:bg-slate-50/50 ${
        isSelected ? "bg-indigo-50/30" : ""
      }`}
    >
      {/* Checkbox Cell */}
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
        />
      </td>

      {/* User Info (Avatar, Name, Email) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <UserInfoCell user={user} />
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <UserStatusBadge status={user.state} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <UserRoleBadge role={user.role} />
      </td>
      {/* Actions (Dropdown) */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <UserActionsDropdown user={user} />
      </td>
    </tr>
  );
};
