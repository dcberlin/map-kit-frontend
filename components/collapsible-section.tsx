import React from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";

type CollapsibleSectionProps = {
  title: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({title, collapsed: collapsedInitial = true, children}: CollapsibleSectionProps) {
  const [collapsed, setCollapsed] = React.useState(collapsedInitial);
  return (
    <div className="border-2 border-gray-200 p-6 rounded-lg">
      <div
        className={`flex items-center text-gray-600 cursor-pointer`}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronDownIcon className="h-8 w-8"/>
        ) : (
          <ChevronUpIcon className="h-8 w-8"/>
        )}
        <h2 className="ml-4">{title}</h2>
      </div>
      {!collapsed && <div>{children}</div>}
    </div>
  );
}
