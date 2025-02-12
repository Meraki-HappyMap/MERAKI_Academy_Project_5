import { Pizza, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Features() {
  const featuresPlace = [
    {
      name: "Dive right in",
      description: "This is one of the few places in the area with a pool.",
      icons: <Pizza />,
    },
    {
      name: "Self check-in",
      description: "Check yourself in with the lockbox.",
      icons: <Phone />,
    },
    {
      name: "Dive right in",
      description: "This is one of the few places in the area with a pool.",
      icons: <Pizza />,
    },
    {
      name: "Free cancellation for 48 hours",
      description: "Get a full refund if you change your mind.",
      icons: <Pizza />,
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {featuresPlace.map((features, index) => (
        <div className="flex flex-row items-center gap-5 ">
          <icons>{features.icons}</icons>
          <AccordionItem value={index + 1} className="w-full">
            <AccordionTrigger className="pl-4 bg-white">
              {features.name}
            </AccordionTrigger>
            <AccordionContent>{features.description}</AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default Features;
