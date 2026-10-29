import Image from "next/image";
import { sellerAvatar } from "@/lib/assets";

const SIZES = {
  xs: { box: "size-5 text-[10px]", px: 20 },
  md: { box: "size-11 text-lg", px: 44 },
  lg: { box: "size-20 text-3xl", px: 80 },
} as const;

/** Avatar slot: public/images/sellers/<handle>.* or the initial letter on a gradient. */
export const SellerAvatar = ({
  handle,
  size = "md",
}: {
  handle: string;
  size?: keyof typeof SIZES;
}) => {
  const src = sellerAvatar(handle);
  const { box, px } = SIZES[size];
  if (src) {
    return (
      <Image
        src={src}
        alt={`${handle} avatar`}
        width={px}
        height={px}
        className={`${box} shrink-0 rounded-full object-cover`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 font-bold text-white`}
    >
      {handle[0]}
    </span>
  );
};
