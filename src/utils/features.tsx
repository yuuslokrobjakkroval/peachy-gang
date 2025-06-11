import { FeaturesConfig } from "@/utils/types";
import {
  MdMessage,
  MdPersonAdd,
  MdStar,
  MdGroup,
  MdCardGiftcard,
  MdExitToApp,
} from "react-icons/md";
import { AiOutlineRobot } from "react-icons/ai";
import { ArrowUpNarrowWide } from "lucide-react";
import { FaThumbsUp } from "react-icons/fa6";

export function UseFeaturesConfig(): FeaturesConfig {
  return {
    "welcome-message": {
      id: "welcome-message",
      nameKey: "welcome-message",
      descriptionKey: "welcome-message_description",
      name: "Welcome Message",
      description: "Send message when user joined the server",
      icon: <MdMessage />,
    },
    "auto-response": {
      id: "auto-response",
      nameKey: "auto-response",
      descriptionKey: "auto-response_description",
      name: "Auto Response",
      description: "Send message for conversation with bot",
      icon: <AiOutlineRobot />,
    },
    "booster-message": {
      id: "booster-message",
      nameKey: "booster-message",
      descriptionKey: "booster-message_description",
      name: "Booster Message",
      description: "Send message when a user boosts the server",
      icon: <MdStar />,
    },
    "invite-tracker-message": {
      id: "invite-tracker-message",
      nameKey: "invite-tracker-message",
      descriptionKey: "invite-tracker-message_description",
      name: "Invite Message",
      description: "Send message when user invite member joined the server",
      icon: <MdPersonAdd />,
    },
    "reaction-roles": {
      id: "reaction-roles",
      nameKey: "reaction-roles",
      descriptionKey: "reaction-roles_description",
      name: "Reaction Roles",
      description: "Allow users to assign themselves roles through message reactions",
      icon: <FaThumbsUp />,
    },
    "join-roles": {
      id: "join-roles",
      nameKey: "join-roles",
      descriptionKey: "join-roles_description",
      name: "Join Roles",
      description: "Assign roles automatically when a user joins the server",
      icon: <MdGroup />,
    },
    "leveling-system": {
      id: "leveling-system",
      nameKey: "leveling-system",
      descriptionKey: "leveling-system_description",
      name: "Leveling System",
      description: "Level up your server with a leveling system",
      icon: <ArrowUpNarrowWide />,
    },
    "giveaway-schedule": {
      id: "giveaway-schedule",
      nameKey: "giveaway-schedule",
      descriptionKey: "giveaway-schedule_description",
      name: "Giveaway Schedule",
      description: "Manage giveaways with ease for your server",
      icon: <MdCardGiftcard />,
    },
    "goodbye-message": {
      id: "goodbye-message",
      nameKey: "goodbye-message",
      descriptionKey: "goodbye-message_description",
      name: "GoodBye Message",
      description: "Send message when user leave the server",
      icon: <MdExitToApp />,
    },
  };
}
