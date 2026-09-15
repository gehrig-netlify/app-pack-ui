import type { Story } from "@ladle/react";
import { BadgeCheck, ChevronRight } from "lucide-react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  type ItemProps,
} from "./item";
import { Button } from "./button";

export default {
  title: "Item",
};

export const Default: Story<ItemProps> = (args) => (
  <Item {...args} className="w-[500px]">
    <ItemContent>
      <ItemTitle>Basic Item</ItemTitle>
      <ItemDescription>A simple item with a title and description.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="outline" size="sm">
        Button
      </Button>
    </ItemActions>
  </Item>
);
Default.args = {
  variant: "default",
  size: "default",
};
Default.argTypes = {
  variant: {
    options: ["default", "muted", "ghost"],
    control: { type: "select" },
  },
  size: {
    options: ["default", "sm"],
    control: { type: "select" },
  },
};

export const Clickable: Story<ItemProps> = (args) => (
  <Item {...args} className="w-[500px] cursor-pointer hover:bg-accent">
    <ItemMedia>
      <BadgeCheck />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Your profile has been verified</ItemTitle>
    </ItemContent>
    <ItemActions>
      <ChevronRight className="size-4 text-muted-foreground" />
    </ItemActions>
  </Item>
);
Clickable.args = {
  variant: "default",
};

export const Muted: Story<ItemProps> = (args) => (
  <Item {...args} className="w-[500px]">
    <ItemContent>
      <ItemTitle>Muted item</ItemTitle>
      <ItemDescription>Uses the muted background variant instead of a border.</ItemDescription>
    </ItemContent>
  </Item>
);
Muted.args = {
  variant: "muted",
};

/** Every `variant` × `size` combination side by side. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">variant=&quot;default&quot;</p>
      <Item variant="default" size="default" className="w-[500px]">
        <ItemContent>
          <ItemTitle>default variant · default size</ItemTitle>
          <ItemDescription>A simple item with a title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Button
          </Button>
        </ItemActions>
      </Item>
      <Item variant="default" size="sm" className="w-[500px]">
        <ItemContent>
          <ItemTitle>default variant · sm size</ItemTitle>
          <ItemDescription>A simple item with a title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Button
          </Button>
        </ItemActions>
      </Item>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">variant=&quot;muted&quot;</p>
      <Item variant="muted" size="default" className="w-[500px]">
        <ItemContent>
          <ItemTitle>muted variant · default size</ItemTitle>
          <ItemDescription>Uses the muted background variant instead of a border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm" className="w-[500px]">
        <ItemContent>
          <ItemTitle>muted variant · sm size</ItemTitle>
          <ItemDescription>Uses the muted background variant instead of a border.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">variant=&quot;ghost&quot;</p>
      <Item variant="ghost" size="default" className="w-[500px] cursor-pointer hover:bg-accent">
        <ItemMedia>
          <BadgeCheck />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>ghost variant · default size</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
      <Item variant="ghost" size="sm" className="w-[500px] cursor-pointer hover:bg-accent">
        <ItemMedia>
          <BadgeCheck />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>ghost variant · sm size</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
    </div>
  </div>
);
