import React from "react";
import Image from "./Image";

import item_star_rail_special_pass from "../assets/images/item_star_rail_special_pass.png";
import item_stellar_jade from "../assets/images/item_stellar_jade.png";

interface ResourceInfoProps {
  label: string;
  stellarJadeAmount?: number;
  specialPassAmount?: number;
  multiplyBy?: string;
}

const ResourceInfo: React.FC<ResourceInfoProps> = ({
  stellarJadeAmount,
  specialPassAmount,
  label,
  multiplyBy,
}) => {
  return (
    <div>
      {label}:
      {specialPassAmount !== undefined && (
        <>
          &nbsp;&nbsp;{specialPassAmount}
          <Image src={item_star_rail_special_pass} />
          {multiplyBy !== undefined && <>&times; {multiplyBy}&nbsp;&nbsp;</>}
        </>
      )}
      {specialPassAmount !== undefined && stellarJadeAmount !== undefined && (
        <>|</>
      )}
      {stellarJadeAmount !== undefined && (
        <>
          &nbsp;&nbsp;{stellarJadeAmount}
          <Image src={item_stellar_jade} />
          {multiplyBy !== undefined && <>&times; {multiplyBy}</>}
        </>
      )}
    </div>
  );
};

export default ResourceInfo;
