import type { Dispatch, SetStateAction } from "react";
import BagSVG from "../assets/SVG/bag.svg";
import KayakSVG from "../assets/SVG/kayak.svg";
import MountainSVG from "../assets/SVG/mountains.svg";
import CrabSVG from "../assets/SVG/crab.svg";
import Events1 from "../assets/Images/morskie_2023.jpg";
import Events2 from "../assets/Images/krakow_2023.jpg";
import Events3 from "../assets/Images/gory_2023.jpg";
import { EventType, EventTypes } from "../interfaces/event/event.interface";
import { ICarousel } from "../components/carousel/Carousel.interface";

export const eventSlides: ICarousel[] = [
  {
    id: 0,
    image: Events1
  },
  {
    id: 1,
    image: Events2
  },
  {
    id: 2,
    image: Events3
  }
];

export const Icons: { id: number; name: string; icon: string; color: string }[] = [
  {
    id: 0,
    name: "Góry",
    icon: MountainSVG,
    color: "#03C988"
  },
  {
    id: 1,
    name: "Spływy",
    icon: KayakSVG,
    color: "#4477CE"
  },
  {
    id: 2,
    name: "Półkolonie",
    icon: BagSVG,
    color: "#F39F5A"
  },
  {
    id: 3,
    name: "Morze",
    icon: CrabSVG,
    color: "#50b5ff"
  }
];

export class EventUtils {
  static readAsBase64(file: File): Promise<string> {
    const reader = new FileReader();
    const fileValue: Promise<string> = new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to read the file."));
        }
      });

      reader.addEventListener("error", (event: ProgressEvent<FileReader>) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }

  static emitEventIcon = (name: EventTypes): string => {
    switch (name) {
      case EventType.mountains:
        return MountainSVG;
      case EventType.kayaking:
        return KayakSVG;
      case EventType.summerCamp:
        return BagSVG;
      case EventType.sea:
        return CrabSVG;
      default:
        return MountainSVG;
    }
  };

  static showEventColor(type: string): string {
    const obj: string[] = [];
    for (let i = 0; i < Icons.length; i++) {
      if (Icons[i].name === type) {
        obj.push(Icons[i].color);
      }
    }
    return obj[0];
  }

  static handleAttraction(
    attractionType: string,
    attractionValue: string,
    extraAttractionValue: string,
    setAttractions: Dispatch<SetStateAction<string[]>>,
    setExtraAttractions: Dispatch<SetStateAction<string[]>>,
    setAttractionValue: Dispatch<SetStateAction<string>>,
    setExtraAttractionValue: Dispatch<SetStateAction<string>>
  ): void {
    const currentValue = attractionType === "attractions" ? attractionValue : extraAttractionValue;

    // Use SetStateAction<string[]> for the setter function's argument type
    const setter: Dispatch<SetStateAction<string[]>> =
      attractionType === "attractions" ? setAttractions : setExtraAttractions;

    if (currentValue.trim() !== "") {
      setter((prevAttractions) => [...prevAttractions, currentValue]);
      attractionType === "attractions" ? setAttractionValue("") : setExtraAttractionValue("");
    }
  }

  static deleteAttraction(
    index: number,
    attractionType: string,
    setAttractions: Dispatch<SetStateAction<string[]>>,
    setExtraAttractions: Dispatch<SetStateAction<string[]>>,
    attractions: string[],
    extraAttractions: string[]
  ): void {
    const attractionsArray = attractionType === "attractions" ? attractions : extraAttractions;
    const setAttractionsArray = attractionType === "attractions" ? setAttractions : setExtraAttractions;

    const updatedAttractions = [...attractionsArray];
    updatedAttractions.splice(index, 1);
    setAttractionsArray(updatedAttractions);
  }

  // static deleteAttraction(
  //   attractionType: "attractions" | "extraAttractions",
  //   setAttractions: Dispatch<SetStateAction<string[]>>,
  //   setExtraAttractions: Dispatch<SetStateAction<string[]>>,
  //   attraction: string
  // ): void {
  //   const setter: Dispatch<SetStateAction<string[]>> =
  //     attractionType === "attractions" ? setAttractions : setExtraAttractions;

  //   setter((prevAttractions) => prevAttractions.filter((item) => item !== attraction));
  // }
}
