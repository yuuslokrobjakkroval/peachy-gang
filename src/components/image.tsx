import { getAbsoluteUrl } from "@/utils/get-absolute-url";

export default function Image(props: any) {
  console.log(
    props.src.startsWith("http") || props.src.startsWith("data:")
      ? props.src
      : `${getAbsoluteUrl()}${props.src}`
  );

  return (
    <>
      {props.src !== "" && (
        <img
          {...props}
          alt=""
          src={
            props.src.startsWith("http") || props.src.startsWith("data:")
              ? props.src
              : `${getAbsoluteUrl()}${props.src}`
          }
          loading="lazy"
        />
      )}
    </>
  );
}
