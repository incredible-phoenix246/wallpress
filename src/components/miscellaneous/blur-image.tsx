import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";

export default function BlurImage(props: ComponentProps<"img">) {
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      {...props}
      alt={props.alt}
      className={cn(
        "duration-500 ease-in-out",
        isLoading ? "blur-sm" : "blur-0",
        props.className
      )}
      onLoad={() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }}
    />
  );
}
