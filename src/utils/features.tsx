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
import { useWelcomeMessageFeature } from "@/modules/features/welcomeMessage";
import { useAutoResponseFeature } from "@/modules/features/autoResponse";
import { useBoosterMessageFeature } from "@/modules/features/boostMessage";
import { useInviteTrackerMessageFeature } from "@/modules/features/inviteTrackerMessage";
import { useJoinRolesFeature } from "@/modules/features/joinRole";
import { useGiveawaysFeature } from "@/modules/features/giveaways";
import { useGoodByeMessageFeature } from "@/modules/features/goodByeMessage";

// import { guild as view } from '@/config/translations/guild';
// import { useJoinCreateFeature } from '@/config/modules/Features/JoinCreateFeature';

export function UseFeaturesConfig(): FeaturesConfig {
  return {
    "welcome-message": {
      name: "Welcome Message",
      description: "Send message when user joined the server",
      icon: <MdMessage />,
      useRender: useWelcomeMessageFeature,
    },
    "auto-response": {
      name: "Auto Response",
      description: "Send message for conversation with bot",
      icon: <AiOutlineRobot />,
      useRender: useAutoResponseFeature,
    },
    "booster-message": {
      name: "Booster Message",
      description: "Send message when a user boosts the server",
      icon: <MdStar />,
      useRender: useBoosterMessageFeature,
    },
    "invite-tracker-message": {
      name: "Invite Message",
      description: "Send message when user invite member joined the server",
      icon: <MdPersonAdd />,
      useRender: useInviteTrackerMessageFeature,
    },
    "join-roles": {
      name: "Join Roles",
      description: "Assign roles automatically when a user joins the server",
      icon: <MdGroup />,
      useRender: useJoinRolesFeature,
    },
    "giveaway-schedule": {
      name: "Giveaway Schedule",
      description: "Manage giveaways with ease for your server",
      icon: <MdCardGiftcard />,
      useRender: useGiveawaysFeature,
    },
    "goodbye-message": {
      name: "GoodBye Message",
      description: "Send message when user leave the server",
      icon: <MdExitToApp />,
      useRender: useGoodByeMessageFeature,
    },
  };
}
