import { getAllUsers } from "@/features/user-managment/adminThunk";
import { UserManagementTable } from "@/features/user-managment/components/UserManagementTable";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6">

      <h1 className="text-xl font-semibold text-slate-900">
        User Management
      </h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200">
        <button onClick={() => setActiveTab("all")}>All Users</button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl">
        <UserManagementTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </div>

    </div>
  );
}