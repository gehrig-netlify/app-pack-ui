import type { Story } from "@ladle/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
  type MenuProps,
} from "./menu";

export default {
  title: "Menu",
};

/** A single dropdown menu with items, a separator, a submenu, and a radio group. */
export const Default: Story<MenuProps> = (args) => (
  <Menu {...args}>
    <MenuTrigger asChild>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Open menu
      </button>
    </MenuTrigger>
    <MenuContent align="start">
      <MenuLabel>Actions</MenuLabel>
      <MenuSeparator />
      <MenuItem>
        Rename
        <MenuShortcut>⌘R</MenuShortcut>
      </MenuItem>
      <MenuItem>
        Duplicate
        <MenuShortcut>⌘D</MenuShortcut>
      </MenuItem>
      <MenuSub>
        <MenuSubTrigger>Move to</MenuSubTrigger>
        <MenuSubContent>
          <MenuItem>Project A</MenuItem>
          <MenuItem>Project B</MenuItem>
        </MenuSubContent>
      </MenuSub>
      <MenuSeparator />
      <MenuRadioGroup value="grid">
        <MenuLabel>View</MenuLabel>
        <MenuRadioItem value="grid">Grid</MenuRadioItem>
        <MenuRadioItem value="list">List</MenuRadioItem>
      </MenuRadioGroup>
      <MenuSeparator />
      <MenuItem variant="destructive">Delete</MenuItem>
    </MenuContent>
  </Menu>
);
Default.args = {};

/**
 * A "File / Edit / View / History" menu bar, mirroring the Figma reference - each label is its
 * own `Menu` instance so any of them can open its own dropdown independently. "View" shows a
 * checkbox item pair ("View All" / "Hide All") like the mock.
 */
export const MenuBar: Story = () => {
  const [showAll, setShowAll] = useState(true);
  const [hideAll, setHideAll] = useState(false);

  const barTriggerClassName =
    "rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[state=open]:bg-muted";

  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-border p-2">
      <Menu>
        <MenuTrigger className={barTriggerClassName}>File</MenuTrigger>
        <MenuContent align="start">
          <MenuItem>New</MenuItem>
          <MenuItem>Open...</MenuItem>
          <MenuItem>Save</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger className={barTriggerClassName}>Edit</MenuTrigger>
        <MenuContent align="start">
          <MenuItem>Undo</MenuItem>
          <MenuItem>Redo</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger className={barTriggerClassName}>View</MenuTrigger>
        <MenuContent align="start">
          <MenuCheckboxItem checked={showAll} onCheckedChange={setShowAll}>
            <span className="flex items-center gap-2">
              <Eye className="size-4" />
              View All
            </span>
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={hideAll} onCheckedChange={setHideAll}>
            <span className="flex items-center gap-2">
              <EyeOff className="size-4" />
              Hide All
            </span>
          </MenuCheckboxItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger className={barTriggerClassName}>History</MenuTrigger>
        <MenuContent align="start">
          <MenuItem>Recent files</MenuItem>
          <MenuItem>Version history</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
};

/**
 * Since `Menu` is a portal-based dropdown, its content only mounts once a trigger is opened - a
 * static story can't force that open state. Instead this shows 2-3 pre-configured triggers side by
 * side so the different configurations (plain items, checkbox items, a submenu) are all visible on
 * the page; click a trigger to see its content open.
 */
export const AllStates: Story = () => {
  const [gridChecked, setGridChecked] = useState(true);
  const [listChecked, setListChecked] = useState(false);

  const triggerClassName =
    "inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-medium text-muted-foreground">
        Click a trigger to open its menu - the open state can&apos;t be forced statically.
      </p>
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">Items + shortcuts</p>
          <Menu>
            <MenuTrigger asChild>
              <button type="button" className={triggerClassName}>
                Actions
              </button>
            </MenuTrigger>
            <MenuContent align="start">
              <MenuLabel>Actions</MenuLabel>
              <MenuSeparator />
              <MenuItem>
                Rename
                <MenuShortcut>⌘R</MenuShortcut>
              </MenuItem>
              <MenuItem>
                Duplicate
                <MenuShortcut>⌘D</MenuShortcut>
              </MenuItem>
              <MenuSeparator />
              <MenuItem variant="destructive">Delete</MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">Checkbox items</p>
          <Menu>
            <MenuTrigger asChild>
              <button type="button" className={triggerClassName}>
                View
              </button>
            </MenuTrigger>
            <MenuContent align="start">
              <MenuCheckboxItem checked={gridChecked} onCheckedChange={setGridChecked}>
                Grid
              </MenuCheckboxItem>
              <MenuCheckboxItem checked={listChecked} onCheckedChange={setListChecked}>
                List
              </MenuCheckboxItem>
            </MenuContent>
          </Menu>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">Submenu</p>
          <Menu>
            <MenuTrigger asChild>
              <button type="button" className={triggerClassName}>
                Organize
              </button>
            </MenuTrigger>
            <MenuContent align="start">
              <MenuItem>Rename</MenuItem>
              <MenuSub>
                <MenuSubTrigger>Move to</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>Project A</MenuItem>
                  <MenuItem>Project B</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuContent>
          </Menu>
        </div>
      </div>
    </div>
  );
};
