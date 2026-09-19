import imgImage from "./044b589933d402106ef8541547b60fdeff9c753f.png";
import imgImage1 from "./bddc569ae394f99d6e20497e0ca7b59d36c54997.png";
import imgImage2 from "./94c9da7f14245899ba192ebc2e34fd7686ea710b.png";

export default function Component03HomepageV() {
  return (
    <div className="relative size-full" data-name="03_Homepage v3">
      <div className="absolute h-[2985px] left-0 top-[5970px] w-[1440px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
      <div className="absolute h-[2985px] left-0 top-[2985px] w-[1440px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <div className="absolute h-[2985px] left-0 top-0 w-[1440px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
      </div>
    </div>
  );
}