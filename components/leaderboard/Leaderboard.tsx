"use client";
import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import NumdleBoard from "./numdle/NumdleBoard";
import { Suspense } from "react";
import Loading from "../ui/Loading";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/**
 * A component for the leaderboard
 * Created By: HungHsu(Allen) Chen and Berk Tellioglu
 * Last Modified: 04/30/2025
 * 
 * @returns
 */
export default function Leaderboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // get game number from search params
  const gameParam = searchParams.get("game");

  // check if gameParam is a number between 0 and 2, if not set to 0
  const gameIndex =
    gameParam !== null
      ? ["0", "1", "2"].includes(gameParam)
        ? parseInt(gameParam, 10)
        : 0
      : 0;

  // tab change url update
  const handleTabChange = (
    event: React.SyntheticEvent | null,
    newValue: string | number | null
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("game", String(newValue));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Tabs value={gameIndex} onChange={handleTabChange}>
        <TabList tabFlex={1}>
          <Tab>Numdle</Tab>
          <Tab>Typing Speed</Tab>
          <Tab>Math Quiz</Tab>
        </TabList>
        <TabPanel value={0}>
          <Suspense fallback={<Loading />}>
            <NumdleBoard />
          </Suspense>
        </TabPanel>
        <TabPanel value={1}>
          <span>This is where the Typing Speed leaderboard would go...</span>
        </TabPanel>
        <TabPanel value={2}>
          <span>This is where the Math Quiz leaderboard would go...</span>
        </TabPanel>
      </Tabs>
    </>
  );
}
