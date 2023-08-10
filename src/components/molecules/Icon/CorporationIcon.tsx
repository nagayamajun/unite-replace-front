import Image from "next/image";
import { MouseEventHandler } from "react";
import { BiSolidBusiness } from "react-icons/bi";

type CorporationIconProps = {
  originalIconImageSrc?: string;
  originalIconImageAlt?: string;
  defaultIconSize?: number;
  defaultIconFill?: string;
  defaultIconClassName?: string;
  originalIconClassName?: string;
  onClick?: MouseEventHandler<Element>;
};

export const CorporationIcon = ({
  originalIconImageSrc,
  originalIconImageAlt = "企業アイコン",
  originalIconClassName = "rounded-full border border-black",
  defaultIconSize = 36,
  defaultIconFill = "gray",
  defaultIconClassName = "rounded-full bg-white border border-black p-1 color-black-100",
  onClick,
}: CorporationIconProps): JSX.Element => (
  <>
    {originalIconImageSrc ? (
      <Image
        src={originalIconImageSrc}
        alt={originalIconImageAlt}
        width={40}
        height={40}
        className={originalIconClassName}
        onClick={onClick}
      />
    ) : (
      <BiSolidBusiness
        size={defaultIconSize}
        fill={defaultIconFill}
        className={defaultIconClassName}
        onClick={onClick}
      />
    )}
  </>
);
