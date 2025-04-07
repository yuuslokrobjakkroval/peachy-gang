import { UseFormRender, WelcomeMessageFeature } from "@/utils/types";

// @ts-ignore
export const useWelcomeMessageFeature: UseFormRender<WelcomeMessageFeature> = (
  data: any,
  onSubmit
) => {
  return <div>Hello</div>;
};
