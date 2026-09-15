import type { Story } from "@ladle/react";
import { useState } from "react";
import { Questionnaire, type QuestionnaireProps } from "./questionnaire";

export default {
  title: "Questionnaire",
};

const options = [
  {
    value: "option-1",
    label: "Answer option 1",
    description: "A detail of the answer option",
  },
  {
    value: "option-2",
    label: "Answer option 2",
    description: "A detail of the answer option",
  },
  {
    value: "option-3",
    label: "Answer option 3",
    description: "A detail of the answer option",
  },
];

/** Uncontrolled, matching the Figma reference (third option selected by default). */
export const Default: Story<QuestionnaireProps> = (args) => <Questionnaire {...args} />;
Default.args = {
  questionNumber: 1,
  totalQuestions: 3,
  title: "What would you like to build next?",
  description: "Select from the options below",
  options,
  defaultValue: "option-3",
  backLabel: "Back",
  nextLabel: "Next",
  backDisabled: false,
  nextDisabled: false,
};
Default.argTypes = {
  backDisabled: {
    control: { type: "boolean" },
  },
  nextDisabled: {
    control: { type: "boolean" },
  },
};

/** Controlled selection driven by component state, with Back/Next wired to step through questions. */
export const Controlled: Story = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <Questionnaire
        questionNumber={step}
        totalQuestions={3}
        title="What would you like to build next?"
        description="Select from the options below"
        options={options}
        value={selected}
        onValueChange={setSelected}
        backDisabled={step === 1}
        onBack={() => setStep((current) => Math.max(1, current - 1))}
        onNext={() => setStep((current) => Math.min(3, current + 1))}
      />
      <p className="text-sm text-muted-foreground">Selected: {selected ?? "none"}</p>
    </div>
  );
};

/** No option pre-selected, and the first option disabled. */
export const NoSelection: Story<QuestionnaireProps> = (args) => <Questionnaire {...args} />;
NoSelection.args = {
  questionNumber: 2,
  totalQuestions: 3,
  title: "Which integrations do you use today?",
  options: [
    { ...options[0], disabled: true },
    options[1],
    options[2],
  ],
};

/** No selection (first question, Back disabled), an option selected, and the last question in the flow. */
export const AllStates: Story = () => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">No selection (first question, Back disabled)</p>
      <Questionnaire
        questionNumber={1}
        totalQuestions={3}
        title="What would you like to build next?"
        description="Select from the options below"
        options={options}
        backDisabled
      />
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Option selected</p>
      <Questionnaire
        questionNumber={2}
        totalQuestions={3}
        title="Which integrations do you use today?"
        options={options}
        defaultValue="option-2"
      />
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-muted-foreground">Last question (Next becomes Finish)</p>
      <Questionnaire
        questionNumber={3}
        totalQuestions={3}
        title="Anything else we should know?"
        description="Select from the options below"
        options={options}
        defaultValue="option-1"
        nextLabel="Finish"
      />
    </div>
  </div>
);
