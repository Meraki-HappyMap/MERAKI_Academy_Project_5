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
        <div key={index} className="flex flex-row items-center gap-5">
          <div className="text-gray-800 dark:text-white">
            {features.icons}
          </div>
          <AccordionItem value={index + 1} className="w-full">
            <AccordionTrigger className="pl-4 bg-white dark:bg-gray-800">
              <span className="text-gray-800 dark:text-white">{features.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600 dark:text-gray-300">{features.description}</p>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}

export default Features;


// import { CheckCircle } from "lucide-react";

// const Features = ({ place }) => {
//   const features = [
//     "WiFi",
//     "Parking",
//     "24/7 Support",
//     "Air Conditioning",
//     "Swimming Pool",
//   ];

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
//         Features
//       </h2>
//       <ul className="space-y-2">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center text-gray-800 dark:text-gray-300">
//             <CheckCircle className="text-green-500 mr-2" />
//             {feature}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Features;

