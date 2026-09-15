import type { Story } from "@ladle/react";
import { Eye, EyeOff } from "lucide-react";
import {
  Navigation,
  NavigationContent,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationTrigger,
  type NavigationProps,
} from "./navigation";

export default {
  title: "Navigation",
};

/**
 * A "File / Edit / View / History" navigation bar, mirroring the Figma reference. "File" and
 * "Edit" are plain links, "View" opens a dropdown panel with two options, and "History" is a
 * disabled placeholder link.
 */
export const Default: Story<NavigationProps> = (args) => (
  <Navigation {...args}>
    <NavigationList>
      <NavigationItem>
        <NavigationLink href="#file">File</NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink href="#edit">Edit</NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationTrigger>View</NavigationTrigger>
        <NavigationContent>
          <ul className="grid w-[260px] gap-1">
            <li>
              <NavigationLink href="#view-all">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Eye className="size-4" />
                  View All
                </span>
                <span className="text-muted-foreground">This will show everything</span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink href="#hide-all">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <EyeOff className="size-4" />
                  Hide All
                </span>
                <span className="text-muted-foreground">This will hide everything</span>
              </NavigationLink>
            </li>
          </ul>
        </NavigationContent>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink href="#history">History</NavigationLink>
      </NavigationItem>
    </NavigationList>
  </Navigation>
);
Default.args = {};

/**
 * Since `Navigation` content panels are portal-based popovers, they only mount once a trigger is
 * opened - a static story can't force that open state. Instead this shows two trigger
 * configurations side by side (plain links vs. a link plus a dropdown trigger); click "View" to
 * see its panel open.
 */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-6">
    <p className="text-sm font-medium text-muted-foreground">
      Click &quot;View&quot; to open its panel - the open state can&apos;t be forced statically.
    </p>
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Links only</p>
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink href="#file">File</NavigationLink>
            </NavigationItem>
            <NavigationItem>
              <NavigationLink href="#edit">Edit</NavigationLink>
            </NavigationItem>
            <NavigationItem>
              <NavigationLink
                href="#history"
                aria-disabled="true"
                className="pointer-events-none opacity-50"
              >
                History
              </NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">With dropdown trigger</p>
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationTrigger>View</NavigationTrigger>
              <NavigationContent>
                <ul className="grid w-[260px] gap-1">
                  <li>
                    <NavigationLink href="#view-all">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <Eye className="size-4" />
                        View All
                      </span>
                      <span className="text-muted-foreground">This will show everything</span>
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink href="#hide-all">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <EyeOff className="size-4" />
                        Hide All
                      </span>
                      <span className="text-muted-foreground">This will hide everything</span>
                    </NavigationLink>
                  </li>
                </ul>
              </NavigationContent>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
    </div>
  </div>
);
