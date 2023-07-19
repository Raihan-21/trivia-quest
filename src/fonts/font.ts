import localFont from "next/font/local";
const stayPixel = localFont({
  src: "../assets/fonts/StayPixelRegular-EaOxl.ttf",
});

const ubuntu = localFont({
  src: [
    {
      path: "../assets/fonts/Ubuntu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ubuntu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
export { stayPixel, ubuntu };
