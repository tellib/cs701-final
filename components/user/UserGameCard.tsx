"use client";

import getUserRecords from "@/lib/user/getUserRecords";
import { userGameRecord } from "@/type";
import { useEffect, useState } from "react";
import NumdleItem from "./UserNumdleGames";

/**
 * A componant used to list out different game records
 * Created By: HungHsu(Allen) Chen
 * Last Modified At: 04/28/2025
 *
 * @param props uid: string
 * @returns
 */
export default function UserGameCard(props: { uid: string }) {
  const [gameRecords, setGameRecords] = useState<userGameRecord | null>();

  // get user's game record from server
  useEffect(() => {
    getUserRecords(props.uid).then((data) => {
      setGameRecords(data);
    });
  }, []);

  // display loading while data loading
  if (!gameRecords) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap">
      <NumdleItem numdleRecord={gameRecords.numdleRecord} />
    </div>
  );
}
