import { Cloud, HardDrive, FolderOpen, Trash2 } from "lucide-react";

export function buildSidebar(providers) {
  const nav = [
    {
      title: "My Workspace",
      icon: HardDrive,
      items: [
        { title: "All Files", url: "/", icon: FolderOpen },
        { title: "Trash", url: "/trash", icon: Trash2 },
      ],
    },
  ];

  Object.entries(providers).forEach(([provider, config]) => {
    if (provider === "google-drive" && config.state === "connected") {
      nav[0].items.push({
        title: "Google Drive",
        url: "/gdrive",
        icon: Cloud,
      });
    }
  });

  return nav;
}
