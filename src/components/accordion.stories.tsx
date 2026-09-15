import type { Story } from "@ladle/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from "./accordion";

export default {
  title: "Accordion",
};

const faqs = [
  {
    value: "shipping",
    question: "What are your shipping options?",
    answer:
      "We offer standard (5–7 day) express (2-3 day), and overnight shipping. Free shipping on international orders.",
  },
  {
    value: "returns",
    question: "What is your return policy?",
    answer: "Items can be returned within 30 days of delivery for a full refund.",
  },
  {
    value: "support",
    question: "How can I contact customer support?",
    answer: "Email support@example.com or use the chat widget in the bottom right corner.",
  },
];

export const Single: Story<AccordionProps> = (args) => (
  <Accordion {...args} className="w-[500px]">
    {faqs.map((faq) => (
      <AccordionItem key={faq.value} value={faq.value}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
Single.args = {
  type: "single",
  collapsible: true,
  defaultValue: "shipping",
};
Single.argTypes = {
  type: {
    options: ["single", "multiple"],
    control: { type: "select" },
  },
  collapsible: {
    control: { type: "boolean" },
  },
};

export const Multiple: Story<AccordionProps> = (args) => (
  <Accordion {...args} className="w-[500px]">
    {faqs.map((faq) => (
      <AccordionItem key={faq.value} value={faq.value}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
Multiple.args = {
  type: "multiple",
  defaultValue: ["shipping", "returns"],
};

/** `type="single"` and `type="multiple"`, each with an item pre-expanded, side by side. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-8 sm:flex-row">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">type=&quot;single&quot;</p>
      <Accordion type="single" collapsible defaultValue="shipping" className="w-[400px]">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">type=&quot;multiple&quot;</p>
      <Accordion type="multiple" defaultValue={["shipping", "returns"]} className="w-[400px]">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </div>
);
