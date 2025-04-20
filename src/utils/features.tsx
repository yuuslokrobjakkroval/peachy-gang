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

export function UseFeaturesConfig(): FeaturesConfig {
  return {
    "welcome-message": {
      name: "Welcome Message",
      description: "Send message when user joined the server",
      icon: <MdMessage />,
    },
    "auto-response": {
      name: "Auto Response",
      description: "Send message for conversation with bot",
      icon: <AiOutlineRobot />,
    },
    "booster-message": {
      name: "Booster Message",
      description: "Send message when a user boosts the server",
      icon: <MdStar />,
    },
    "invite-tracker-message": {
      name: "Invite Message",
      description: "Send message when user invite member joined the server",
      icon: <MdPersonAdd />,
    },
    "join-roles": {
      name: "Join Roles",
      description: "Assign roles automatically when a user joins the server",
      icon: <MdGroup />,
    },
    "giveaway-schedule": {
      name: "Giveaway Schedule",
      description: "Manage giveaways with ease for your server",
      icon: <MdCardGiftcard />,
    },
    "goodbye-message": {
      name: "GoodBye Message",
      description: "Send message when user leave the server",
      icon: <MdExitToApp />,
    },
  };
}
