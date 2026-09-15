import type { Story } from "@ladle/react";
import { useState } from "react";
import { Home, Box, BookOpen, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  type SidebarProps,
} from "./sidebar";

export default {
  title: "Sidebar",
};

/**
 * The Figma reference layout - Home, a "Products" group with a nested sub-list (Agent Runners /
 * Database / Functions), and Docs - wired to real expand/collapse behavior via `SidebarProvider`
 * and `SidebarTrigger`. Resize the viewport below `768px` (or use Ladle's device toolbar) to see
 * it switch to the mobile sheet, driven by Radix `Dialog` under the hood.
 */
export const Default: Story<Pick<SidebarProps, "variant" | "collapsible" | "side">> = ({
  variant,
  collapsible,
  side,
}) => {
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <SidebarProvider className="h-[480px] transform-gpu overflow-hidden rounded-lg border border-border">
      <Sidebar variant={variant} collapsible={collapsible} side={side}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setProductsOpen((value) => !value)}>
                    <Box />
                    <span>Products</span>
                    <ChevronRight
                      className={`ml-auto transition-transform ${productsOpen ? "rotate-90" : ""}`}
                    />
                  </SidebarMenuButton>
                  {productsOpen ? (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#agent-runners">Agent Runners</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#database">Database</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#functions">Functions</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BookOpen />
                <span>Docs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 border-b border-border p-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-foreground">Main content</span>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          Toggle the sidebar with the button above, or press Cmd/Ctrl+B.
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
Default.args = {
  variant: "sidebar",
  collapsible: "offcanvas",
  side: "left",
};
Default.argTypes = {
  variant: {
    options: ["sidebar", "floating", "inset"],
    control: { type: "select" },
  },
  collapsible: {
    options: ["offcanvas", "icon", "none"],
    control: { type: "select" },
  },
  side: {
    options: ["left", "right"],
    control: { type: "select" },
  },
};

/** `collapsible="icon"` collapses to an icon-only rail instead of sliding fully off-screen. */
export const IconCollapsible: Story = () => (
  <SidebarProvider
    className="h-[360px] transform-gpu overflow-hidden rounded-lg border border-border"
    defaultOpen={false}
  >
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Box />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BookOpen />
                <span>Docs</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <div className="flex items-center gap-2 border-b border-border p-4">
        <SidebarTrigger />
        <span className="text-sm font-medium text-foreground">Main content</span>
      </div>
    </SidebarInset>
  </SidebarProvider>
);

/**
 * Expanded vs. collapsed (`collapsible="icon"`), forced via `SidebarProvider`'s `defaultOpen`,
 * shown side by side with a representative header/content-group/footer layout.
 */
export const AllStates: Story = () => (
  <div className="flex flex-wrap items-start gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Expanded</p>
      <SidebarProvider
        className="h-[360px] w-[300px] transform-gpu overflow-hidden rounded-lg border border-border"
        defaultOpen
      >
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Box />
                      <span>Products</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#agent-runners">Agent Runners</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#database">Database</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpen />
                  <span>Docs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex items-center gap-2 border-b border-border p-4">
            <SidebarTrigger />
            <span className="text-sm font-medium text-foreground">Main content</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground">Collapsed (icon rail)</p>
      <SidebarProvider
        className="h-[360px] w-[220px] transform-gpu overflow-hidden rounded-lg border border-border"
        defaultOpen={false}
      >
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Box />
                      <span>Products</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpen />
                  <span>Docs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex items-center gap-2 border-b border-border p-4">
            <SidebarTrigger />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </div>
);
